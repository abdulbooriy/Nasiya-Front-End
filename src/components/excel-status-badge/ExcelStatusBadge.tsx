// Excel-style status badge component
import { Box } from '@mui/material';
import { excelTheme } from 'src/theme/excel-theme';

interface ExcelStatusBadgeProps {
  status: 'PAID' | 'PENDING' | 'UNDERPAID' | 'OVERPAID' | 'REJECTED' | 'active' | 'completed' | 'cancelled';
  label?: string;
}

export function ExcelStatusBadge({ status, label }: ExcelStatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'PAID':
      case 'completed':
        return {
          backgroundColor: excelTheme.colors.green,
          color: excelTheme.colors.greenText,
        };
      case 'REJECTED':
      case 'cancelled':
        return {
          backgroundColor: excelTheme.colors.red,
          color: excelTheme.colors.redText,
        };
      case 'PENDING':
        return {
          backgroundColor: excelTheme.colors.yellow,
          color: excelTheme.colors.yellowText,
        };
      case 'UNDERPAID':
        return {
          backgroundColor: excelTheme.colors.yellow,
          color: excelTheme.colors.yellowText,
        };
      case 'OVERPAID':
        return {
          backgroundColor: excelTheme.colors.blue,
          color: excelTheme.colors.blueText,
        };
      case 'active':
        return {
          backgroundColor: excelTheme.colors.blue,
          color: excelTheme.colors.blueText,
        };
      default:
        return {
          backgroundColor: excelTheme.colors.lightGray,
          color: '#000000',
        };
    }
  };

  const statusStyle = getStatusStyle();
  const displayLabel = label || status;

  return (
    <Box
      sx={{
        display: 'inline-block',
        padding: '3px 8px',
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: 'Calibri, Arial, sans-serif',
        border: `1px solid ${statusStyle.color}`,
        borderRadius: 0, // Excel: sharp corners
        textAlign: 'center',
        textTransform: 'uppercase',
        ...statusStyle,
      }}
    >
      {displayLabel}
    </Box>
  );
}
