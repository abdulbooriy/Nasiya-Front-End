import { MdSort, MdSearch, MdFilterList, MdViewColumn } from "react-icons/md";

import Grid from "@mui/material/Unstable_Grid2";
import { Box, Stack, Button, TextField, InputAdornment } from "@mui/material";
import { EXCEL_COLORS } from "./excel-table-styles";

interface TableToolbarProps {
  onFilterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSortClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onColumnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  component?: React.ReactNode;
  calendar?: React.ReactNode;
  uploadData?: React.ReactNode;
}

export function TableToolbar({
  onFilterClick,
  onSortClick,
  onColumnClick,
  searchText,
  onSearchChange,
  component,
  calendar,
  uploadData,
}: TableToolbarProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      px={1.5}
      py={1}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        // Colleague's UI: rounded floating card style — hardcoded colors replaced with CSS vars
        backgroundColor: "var(--palette-background-neutral)",
        borderBottom: `1px solid rgba(var(--palette-grey-500Channel) / 0.2)`,
        p: "6px",
        borderRadius: "12px",
        marginBottom: "12px",
        boxShadow: `
    0 1px 2px rgba(0,0,0,0.04),
    0 6px 20px rgba(0,0,0,0.06),
    0 20px 40px rgba(0,0,0,0.08)
  `,
      }}
    >
      <Grid
        container
        // sx={{ alignItems: "center" }}
        spacing={1}
        width={1}
      >
        <Grid xs={12} sm={6} md={component ? 3 : 6}>
          <TextField
            placeholder="Qidirish..."
            size="small"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              width: 1,
              // Colleague's UI: richer blur/rounded search field
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "var(--layout-nav-item-hover-bg)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "0.5px solid rgba(0,0,0,0.08)",
                boxShadow: `
        0 1px 2px rgba(0,0,0,0.02),
        0 4px 14px rgba(0,0,0,0.03)
      `,
                fontWeight: 600,
                fontSize: "0.75rem",
                height: "38px",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                "& fieldset": {
                  border: "none",
                },
                "&.Mui-focused": {
                  // Dark-mode-safe: replaced hardcoded "#fff" with CSS var
                  background: "var(--palette-background-paper)",
                  boxShadow: `
          0 0 0 3px rgba(0,122,255,0.15),
          0 8px 24px rgba(0,0,0,0.06)
        `,
                },
              },

              "& .MuiOutlinedInput-input": {
                padding: "14px 16px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {component && (
          <Grid xs={12} sm={6} md={4} display="flex" justifyContent="end">
            {component}
          </Grid>
        )}
        {/* {calendar && (
          <Grid xs={12} sm={6} md={3} justifyItems="right">
            {calendar}
          </Grid>
        )} */}
        <Grid xs={12} md={component ? 5 : 6} justifyItems="right">
          <Stack
            width={1}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="end"
            spacing={1}
          >
            {/* {calendar && (
              <Box display="flex" justifyContent="end">
                {calendar}
              </Box>
            )} */}
            <Stack direction="row" spacing={1} justifyContent="end">
              {/* <Button
                variant="outlined"
                size="small"
                startIcon={<MdFilterList size={14} />}
                onClick={onFilterClick}
                sx={{
                  fontSize: "10px",
                  minHeight: "28px",
                  fontWeight: 900,
                  px: "10px",
                  py: "6px",
                  textTransform: "uppercase",
                  borderRadius: "10px",
                  borderColor: "var(--layout-nav-item-hover-bg)",
                  color: "var(--layout-nav-item-color)",
                  "&:hover": {
                    color: "var(--palette-text-primary)",
                    borderColor: "var(--layout-nav-item-hover-bg)",
                    backgroundColor: 'rgba(var(--palette-primary-mainChannel) / 0.06)',
                  },
                }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<MdSort size={14} />}
                onClick={onSortClick}
                sx={{
                  fontSize: "10px",
                  minHeight: "28px",
                  py: "4px",
                  px: "10px",
                  textTransform: "none",
                  borderColor: EXCEL_COLORS.gridLine,
                  color: EXCEL_COLORS.cellText,
                  "&:hover": {
                    borderColor: EXCEL_COLORS.headerBg,
                    backgroundColor: 'rgba(var(--palette-primary-mainChannel) / 0.06)',
                  },
                }}
              >
                Saralash
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<MdViewColumn size={14} />}
                onClick={onColumnClick}
                sx={{
                  fontSize: "10px",
                  minHeight: "28px",
                  py: "4px",
                  px: "10px",
                  textTransform: "none",
                  borderColor: EXCEL_COLORS.gridLine,
                  color: EXCEL_COLORS.cellText,
                  "&:hover": {
                    borderColor: EXCEL_COLORS.headerBg,
                    backgroundColor: 'rgba(var(--palette-primary-mainChannel) / 0.06)',
                  },
                }}
              >
                Ustunlar
              </Button> */}
              {/* new button design */}
              <Box
                sx={{
                  display: "inline-flex",
                  gap: "4px",
                  background: "#F3F4F6",
                  p: "4px",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <Button
                  onClick={onFilterClick}
                  startIcon={<MdFilterList size={14} />}
                  disableRipple
                  sx={{
                    minWidth: 0,
                    px: "12px",
                    height: "28px",

                    borderRadius: "10px",

                    fontSize: "11px",
                    fontWeight: 700,

                    textTransform: "uppercase",

                    color: "#6B7280",

                    background: "transparent",

                    "&:hover": {
                      background: "#fff",
                      color: "#111827",

                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Filtr
                </Button>

                <Button
                  onClick={onSortClick}
                  startIcon={<MdSort size={14} />}
                  disableRipple
                  sx={{
                    minWidth: 0,
                    px: "12px",
                    height: "28px",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#6B7280",

                    "&:hover": {
                      background: "#fff",
                      color: "#111827",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Saralash
                </Button>

                <Button
                  onClick={onColumnClick}
                  startIcon={<MdViewColumn size={14} />}
                  disableRipple
                  sx={{
                    minWidth: 0,
                    px: "12px",
                    height: "28px",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#6B7280",

                    "&:hover": {
                      background: "#fff",
                      color: "#111827",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Ustunlar
                </Button>
              </Box>
              {calendar && <Box sx={{ overflow: "hidden" }}>{calendar}</Box>}
              {/* {uploadData && uploadData} */}
            </Stack>
            {uploadData && uploadData}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
