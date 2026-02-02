import "react-datepicker/dist/react-datepicker.css";

import type { RootState } from "src/store";
import type { IDebt } from "src/types/debtor";
import type { IContract } from "src/types/contract";

import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { useRef, useState, useEffect, forwardRef, useCallback } from "react";

import {
  Tab,
  Box,
  Tabs,
  Card,
  Stack,
  Badge,
  Button,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

import { useAppDispatch } from "src/hooks/useAppDispatch";

import { DashboardContent } from "src/layouts/dashboard";
import { setCustomerId } from "src/store/slices/customerSlice";
import { getManagers } from "src/store/actions/employeeActions";
import { getDebtors, getDebtContract } from "src/store/actions/debtorActions";

import Loader from "src/components/loader/Loader";

import DebtorTable from "./debtorTable";
import { columnsDebtor, columnsContract } from "./columns";
import { DebtorDetailModal } from "../modal/debtor-detail-modal";
import { ContractDetailModal } from "../modal/contract-detail-modal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function DebtorView() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dataEmployee = useSelector((state: RootState) => state.employee);
  const { isLoading, debtors, debtContracts } = useSelector(
    (state: RootState) => state.debtor
  );
  const [manager, setManager] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const hasFetchedManager = useRef(false);

  // Modal states
  const [debtorModalOpen, setDebtorModalOpen] = useState(false);
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [selectedDebtor, setSelectedDebtor] = useState<IDebt | null>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  useEffect(() => {
    dispatch(getDebtors());
    dispatch(getDebtContract());
  }, [dispatch]);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(getDebtContract({ startDate, endDate }));
    } else if (startDate === null && endDate === null) {
      dispatch(getDebtContract());
    }
  }, [startDate, endDate, dispatch]);

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleCustomerFocus = useCallback(() => {
    dispatch(getManagers());
    hasFetchedManager.current = true;
  }, [dispatch]);

  const managerFullName = manager
    ? `${manager.firstName} ${manager.lastName}`
    : null;

  const filteredDebtors = managerFullName
    ? debtors.filter((debtor) => debtor.manager === managerFullName)
    : debtors;

  const filteredContracts = managerFullName
    ? debtContracts.filter((contract) => contract.manager === managerFullName)
    : debtContracts;

  const ManagerFilter = (
    <Autocomplete
      onFocus={handleCustomerFocus}
      options={dataEmployee.managers}
      getOptionLabel={(option) => option.fullName}
      isOptionEqualToValue={(option, value) =>
        option.fullName === value.fullName
      }
      loading={dataEmployee.isLoading}
      loadingText="Yuklanmoqda..."
      noOptionsText="Menejerlar topilmadi"
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label="Menejer bo'yicha filter"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {dataEmployee.isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onChange={(_event, value) => {
        setManager(value);
      }}
      value={manager}
      sx={{
        minWidth: { xs: 150, sm: 180, md: 200 },
        width: "100%",
        maxWidth: 400,
      }}
    />
  );

  const calendar = (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update)}
      customInput={<CustomDateInput />}
      isClearable
      popperPlacement="bottom-end"
      portalId="root-portal"
    />
  );

  if (debtors.length === 0 && isLoading) {
    return <Loader />;
  }

  return (
    <DashboardContent>
      <Stack spacing={1}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Typography variant="h6" fontWeight="bold">
                  Qarzdorlar
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Badge
                  color="error"
                  badgeContent={debtContracts.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ pr: 2 }}>
                    Qarzdorliklar
                  </Typography>
                </Badge>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          <DebtorTable
            data={filteredDebtors}
            columns={columnsDebtor}
            component={ManagerFilter}
            onRowClick={(row) => {
              setSelectedDebtor(row);
              setDebtorModalOpen(true);
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>

          <DebtorTable
            data={filteredContracts}
            columns={columnsContract}
            component={ManagerFilter}
            onRowClick={(row) => {
              setSelectedContract(row);
              setContractModalOpen(true);
            }}
            calendar={calendar}
          />
        </CustomTabPanel>
      </Stack>

      {/* Modals */}
      <DebtorDetailModal
        open={debtorModalOpen}
        onClose={() => {
          setDebtorModalOpen(false);
          setSelectedDebtor(null);
        }}
        debtor={selectedDebtor}
      />

      <ContractDetailModal
        open={contractModalOpen}
        onClose={() => {
          setContractModalOpen(false);
          setSelectedContract(null);
        }}
        contract={selectedContract}
      />
    </DashboardContent>
  );
}

const CustomDateInput = forwardRef<
  HTMLButtonElement,
  {
    value?: string;
    onClick?: () => void;
  }
>(({ value, onClick }, ref) => (
  <Button
    ref={ref}
    onClick={onClick}
    variant="text"
    color="inherit"
    startIcon={<IoCalendarOutline />}
    sx={{
      minWidth: { xs: 50, sm: 60, md: 70 },
      px: { xs: 1, sm: 1.5 },
    }}
  />
));
