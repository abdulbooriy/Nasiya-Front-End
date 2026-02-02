// Excel-style jadval uchun umumiy stillar
import type { SxProps, Theme } from '@mui/material';

export const EXCEL_COLORS = {
  // Excel header ranglari
  headerBg: '#217346',
  headerBgHover: '#1a5c37',
  headerText: '#FFFFFF',
  headerBorder: '#1A5C37',
  
  // Grid ranglari
  gridLine: '#D4D4D8',
  gridLineLight: '#E4E4E7',
  
  // Row ranglari
  rowEven: '#FFFFFF',
  rowOdd: '#F9FAFB',
  rowHover: '#F3F4F6',
  rowSelected: '#E0F2FE',
  
  // Cell ranglari
  cellText: '#18181B',
  cellTextSecondary: '#71717A',
  cellBorder: '#E4E4E7',
} as const;

export const EXCEL_DIMENSIONS = {
  // Balandliklar (Excel kabi compact)
  headerHeight: 22,
  rowHeight: 32,
  
  // Padding
  cellPaddingX: 6,
  cellPaddingY: 4,
  
  // Font sizes
  headerFontSize: 10,
  cellFontSize: 10,
  
  // Border widths
  borderWidth: 1,
} as const;

// Header cell style
export const excelHeaderCellStyle: SxProps<Theme> = {
  height: `${EXCEL_DIMENSIONS.headerHeight}px`,
  minHeight: `${EXCEL_DIMENSIONS.headerHeight}px`,
  maxHeight: `${EXCEL_DIMENSIONS.headerHeight}px`,
  px: `${EXCEL_DIMENSIONS.cellPaddingX}px`,
  py: `${EXCEL_DIMENSIONS.cellPaddingY}px`,
  fontSize: `${EXCEL_DIMENSIONS.headerFontSize}px`,
  fontWeight: 600,
  lineHeight: `${EXCEL_DIMENSIONS.headerHeight - EXCEL_DIMENSIONS.cellPaddingY * 2}px`,
  backgroundColor: `${EXCEL_COLORS.headerBg} !important`,
  color: `${EXCEL_COLORS.headerText} !important`,
  borderRight: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.headerBorder}`,
  borderBottom: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.headerBorder}`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  position: 'sticky',
  top: 0,
  zIndex: 3,
  userSelect: 'none',
  transition: 'background-color 0.15s ease',
  verticalAlign: 'middle',
  '&:hover': {
    backgroundColor: `${EXCEL_COLORS.headerBgHover} !important`,
  },
};

// Body cell style
export const excelBodyCellStyle: SxProps<Theme> = {
  height: `${EXCEL_DIMENSIONS.rowHeight}px`,
  minHeight: `${EXCEL_DIMENSIONS.rowHeight}px`,
  maxHeight: `${EXCEL_DIMENSIONS.rowHeight}px`,
  px: `${EXCEL_DIMENSIONS.cellPaddingX}px`,
  py: `${EXCEL_DIMENSIONS.cellPaddingY}px`,
  fontSize: `${EXCEL_DIMENSIONS.cellFontSize}px`,
  lineHeight: `${EXCEL_DIMENSIONS.rowHeight - EXCEL_DIMENSIONS.cellPaddingY * 2}px`,
  color: EXCEL_COLORS.cellText,
  borderRight: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.cellBorder}`,
  borderBottom: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.cellBorder}`,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition: 'background-color 0.1s ease',
  verticalAlign: 'middle',
};

// Row style
export const excelRowStyle: SxProps<Theme> = {
  height: `${EXCEL_DIMENSIONS.rowHeight}px`,
  minHeight: `${EXCEL_DIMENSIONS.rowHeight}px`,
  maxHeight: `${EXCEL_DIMENSIONS.rowHeight}px`,
  cursor: 'pointer',
  transition: 'background-color 0.1s ease',
  '&:nth-of-type(even)': {
    backgroundColor: EXCEL_COLORS.rowEven,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: EXCEL_COLORS.rowOdd,
  },
  '&:hover': {
    backgroundColor: `${EXCEL_COLORS.rowHover} !important`,
  },
  '&.Mui-selected': {
    backgroundColor: `${EXCEL_COLORS.rowSelected} !important`,
    '&:hover': {
      backgroundColor: `${EXCEL_COLORS.rowSelected} !important`,
    },
  },
};

// Table container style
export const excelTableContainerStyle: SxProps<Theme> = {
  border: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.gridLine}`,
  borderRadius: 0,
  maxHeight: 'calc(100vh - 280px)',
  overflow: 'auto',
  backgroundColor: '#FFFFFF',
  // Custom scrollbar
  '&::-webkit-scrollbar': {
    width: '12px',
    height: '12px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F4F4F5',
    borderLeft: `1px solid ${EXCEL_COLORS.gridLine}`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#A1A1AA',
    borderRadius: '6px',
    border: '2px solid #F4F4F5',
    '&:hover': {
      backgroundColor: '#71717A',
    },
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: '#F4F4F5',
  },
};

// Card wrapper style
export const excelCardStyle: SxProps<Theme> = {
  boxShadow: 'none',
  border: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.gridLine}`,
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
};

// Pagination style
export const excelPaginationStyle: SxProps<Theme> = {
  borderTop: `${EXCEL_DIMENSIONS.borderWidth}px solid ${EXCEL_COLORS.gridLine}`,
  backgroundColor: '#FAFAFA',
  '& .MuiTablePagination-toolbar': {
    minHeight: '36px',
    px: 1.5,
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    fontSize: '10px',
    color: EXCEL_COLORS.cellTextSecondary,
    m: 0,
  },
  '& .MuiTablePagination-select': {
    fontSize: '10px',
  },
  '& .MuiTablePagination-actions': {
    ml: 1,
    '& .MuiIconButton-root': {
      padding: '4px',
    },
  },
};

// Sticky column styles
export const excelStickyLeftStyle = (offset: number = 0): SxProps<Theme> => ({
  position: 'sticky',
  left: offset,
  zIndex: 2,
  boxShadow: '2px 0 4px -2px rgba(0,0,0,0.12)',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: EXCEL_COLORS.gridLine,
  },
});

export const excelStickyRightStyle = (offset: number = 0): SxProps<Theme> => ({
  position: 'sticky',
  right: offset,
  zIndex: 2,
  boxShadow: '-2px 0 4px -2px rgba(0,0,0,0.12)',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: EXCEL_COLORS.gridLine,
  },
});

// Checkbox style
export const excelCheckboxStyle: SxProps<Theme> = {
  p: 0,
  transform: 'scale(0.75)',
  '& .MuiSvgIcon-root': {
    fontSize: '14px',
  },
};

// Empty/No data style
export const excelNoDataStyle: SxProps<Theme> = {
  py: 4,
  textAlign: 'center',
  color: EXCEL_COLORS.cellTextSecondary,
  fontSize: '11px',
  fontStyle: 'italic',
};
