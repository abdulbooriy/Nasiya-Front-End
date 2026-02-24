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
        backgroundColor: "var(--palette-background-neutral)",
        borderBottom: `1px solid rgba(var(--palette-grey-500Channel) / 0.2)`,
      }}
    >
      <Grid container spacing={1} width={1}>
        <Grid xs={12} sm={6} md={component ? 3 : 6}>
          <TextField
            placeholder="Qidirish..."
            size="small"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ 
              mr: 2, 
              width: 1,
              '& .MuiOutlinedInput-root': {
                fontSize: '11px',
                height: '32px',
                backgroundColor: 'var(--palette-background-paper)',
                '& fieldset': {
                  borderColor: EXCEL_COLORS.gridLine,
                },
                '&:hover fieldset': {
                  borderColor: EXCEL_COLORS.headerBg,
                },
              },
              '& .MuiOutlinedInput-input': {
                py: '6px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={16} />
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
              <Button
                variant="outlined"
                size="small"
                startIcon={<MdFilterList size={14} />}
                onClick={onFilterClick}
                sx={{
                  fontSize: '10px',
                  minHeight: '28px',
                  py: '4px',
                  px: '10px',
                  textTransform: 'none',
                  borderColor: EXCEL_COLORS.gridLine,
                  color: EXCEL_COLORS.cellText,
                  '&:hover': {
                    borderColor: EXCEL_COLORS.headerBg,
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
                  fontSize: '10px',
                  minHeight: '28px',
                  py: '4px',
                  px: '10px',
                  textTransform: 'none',
                  borderColor: EXCEL_COLORS.gridLine,
                  color: EXCEL_COLORS.cellText,
                  '&:hover': {
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
                  fontSize: '10px',
                  minHeight: '28px',
                  py: '4px',
                  px: '10px',
                  textTransform: 'none',
                  borderColor: EXCEL_COLORS.gridLine,
                  color: EXCEL_COLORS.cellText,
                  '&:hover': {
                    borderColor: EXCEL_COLORS.headerBg,
                    backgroundColor: 'rgba(var(--palette-primary-mainChannel) / 0.06)',
                  },
                }}
              >
                Ustunlar
              </Button>
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
