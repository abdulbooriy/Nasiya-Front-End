import {
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

import { Iconify } from "src/components/iconify";
import {
  AuditLogFilters as FilterType,
  AuditAction,
  AUDIT_ACTION_LABELS,
} from "src/types/audit-log";
import axiosInstance from "src/server/api";

// Manager interface
interface Manager {
  _id: string;
  firstName: string;
  lastName: string;
}


interface AuditLogFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: Partial<FilterType>) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export default function AuditLogFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  loading,
}: AuditLogFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterType>(filters);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    filters.date ? dayjs(filters.date) : null
  );
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loadingManagers, setLoadingManagers] = useState(true);

  // Manager'larni yuklash
  useEffect(() => {
    const fetchManagers = async () => {
      setLoadingManagers(true);
      try {
        console.log("🔍 Xodimlarni yuklash boshlandi...");
        
        // ✅ /manager endpoint'i permission talab qilmaydi
        // ✅ axiosInstance avtomatik baseURL va token qo'shadi
        // ✅ To'g'ri URL: /api + /employee/manager = /api/employee/manager
        const response = await axiosInstance.get("/employee/manager");
        
        console.log("📦 API javobi:", response.data);
        
        // API javobini tekshirish
        let employees = [];
        if (response.data.data && Array.isArray(response.data.data)) {
          employees = response.data.data;
          console.log("✅ response.data.data dan olindi");
        } else if (response.data.employees && Array.isArray(response.data.employees)) {
          employees = response.data.employees;
          console.log("✅ response.data.employees dan olindi");
        } else if (Array.isArray(response.data)) {
          employees = response.data;
          console.log("✅ response.data dan olindi");
        }
        
        console.log("👥 Xodimlar soni:", employees.length);
        console.log("👥 Xodimlar:", employees);
        
        // Barcha xodimlarni qo'shamiz
        setManagers(employees);
        
        if (employees.length === 0) {
          console.warn("⚠️ Manager'lar topilmadi. Database'da 'manager' role'idagi active xodimlar yo'qmi?");
        }
      } catch (error) {
        console.error("❌ Xodimlarni yuklashda xato:", error);
        if (axios.isAxiosError(error)) {
          console.error("📡 Response:", error.response?.data);
          console.error("📡 Status:", error.response?.status);
          console.error("📡 URL:", error.config?.url);
        }
        setManagers([]); // Xato bo'lsa bo'sh array
      } finally {
        setLoadingManagers(false);
      }
    };
    fetchManagers();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
    setSelectedDate(filters.date ? dayjs(filters.date) : null);
  }, [filters]);

  const actionOptions = Object.entries(AUDIT_ACTION_LABELS).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  const handleFilterChange = (field: keyof FilterType, value: any) => {
    const newFilters = { ...localFilters, [field]: value, page: 1 };
    setLocalFilters(newFilters);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    const dateValue = newDate ? newDate.format("YYYY-MM-DD") : undefined;
    handleFilterChange("date", dateValue);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({ limit: 100, page: 1 });
    setSelectedDate(null);
    onClearFilters();
  };

  const activeFiltersCount = Object.entries(localFilters).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !["limit", "page"].includes(key)
  ).length;

  return (
    <Card sx={{ boxShadow: 1 }}>
      <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
        <Grid container spacing={1.5} alignItems="center">
          {/* Search Input */}
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="small"
              label="Qidiruv"
              placeholder="Mijoz yoki mahsulot nomi..."
              value={localFilters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
              <DatePicker
                label="Sana"
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Harakat</InputLabel>
                <Select
                  value={localFilters.action || ""}
                  label="Harakat"
                  onChange={(e) =>
                    handleFilterChange("action", e.target.value || undefined)
                  }
                >
                  <MenuItem value="">
                    <em>Hammasi</em>
                  </MenuItem>
                  {actionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Xodim</InputLabel>
                <Select
                  value={localFilters.employeeId || ""}
                  label="Xodim"
                  onChange={(e) =>
                    handleFilterChange("employeeId", e.target.value || undefined)
                  }
                  disabled={loadingManagers}
                >
                  <MenuItem value="">
                    <em>Hammasi</em>
                  </MenuItem>
                  {loadingManagers ? (
                    <MenuItem disabled>
                      <em>Yuklanmoqda...</em>
                    </MenuItem>
                  ) : managers.length === 0 ? (
                    <MenuItem disabled>
                      <em>Manager'lar topilmadi</em>
                    </MenuItem>
                  ) : (
                    managers.map((manager) => (
                      <MenuItem key={manager._id} value={manager._id}>
                        {manager.firstName} {manager.lastName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Stack direction="row" spacing={1} alignItems="center">
                {activeFiltersCount > 0 && (
                  <Chip
                    size="small"
                    label={`${activeFiltersCount}`}
                    color="primary"
                    variant="filled"
                  />
                )}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Iconify icon="eva:refresh-outline" />}
                  onClick={handleClearFilters}
                >
                  Tozalash
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Iconify icon="eva:search-fill" />}
                  onClick={handleApplyFilters}
                  disabled={loading}
                >
                  Qidirish
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {activeFiltersCount > 0 && (
            <Box mt={1}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {localFilters.date && (
                  <Chip
                    size="small"
                    label={`Sana: ${dayjs(localFilters.date).format("DD.MM.YYYY")}`}
                    onDelete={() => {
                      setSelectedDate(null);
                      handleFilterChange("date", undefined);
                    }}
                    color="primary"
                    variant="outlined"
                  />
                )}


                {localFilters.action && (
                  <Chip
                    size="small"
                    label={`Harakat: ${AUDIT_ACTION_LABELS[localFilters.action as AuditAction]}`}
                    onDelete={() => handleFilterChange("action", undefined)}
                    color="primary"
                    variant="outlined"
                  />
                )}

                {localFilters.search && (
                  <Chip
                    size="small"
                    label={`Qidiruv: ${localFilters.search}`}
                    onDelete={() => handleFilterChange("search", undefined)}
                    color="primary"
                    variant="outlined"
                  />
                )}

                {localFilters.employeeId && (() => {
                  const employee = Array.isArray(managers) 
                    ? managers.find(m => m._id === localFilters.employeeId)
                    : null;
                  return (
                    <Chip
                      size="small"
                      label={`Xodim: ${employee ? `${employee.firstName} ${employee.lastName}` : localFilters.employeeId}`}
                      onDelete={() => handleFilterChange("employeeId", undefined)}
                      color="primary"
                      variant="outlined"
                    />
                  );
                })()}
              </Stack>
            </Box>
          )}
      </CardContent>
    </Card>
  );
}
