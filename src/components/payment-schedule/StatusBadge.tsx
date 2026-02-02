import { Box } from "@mui/material";
import { excelTheme } from "src/theme/excel-theme";
import { Iconify } from "../iconify";

interface StatusBadgeProps {
  status: string;
  size?: "small" | "medium";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = "small" 
}) => {
  const getStatusStyle = () => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return {
          backgroundColor: excelTheme.colors.green,
          color: excelTheme.colors.greenText,
          label: "TO'LANDI",
          icon: "mdi:check-circle",
        };
      case "UNDERPAID":
        return {
          backgroundColor: excelTheme.colors.yellow,
          color: excelTheme.colors.yellowText,
          label: "KAM",
          icon: "mdi:alert",
        };
      case "OVERPAID":
        return {
          backgroundColor: excelTheme.colors.blue,
          color: excelTheme.colors.blueText,
          label: "KO'P",
          icon: "mdi:arrow-up",
        };
      case "PENDING":
        return {
          backgroundColor: excelTheme.colors.yellow,
          color: excelTheme.colors.yellowText,
          label: "KUTISH",
          icon: "mdi:clock-outline",
        };
      case "REJECTED":
        return {
          backgroundColor: excelTheme.colors.red,
          color: excelTheme.colors.redText,
          label: "RAD ETILDI",
          icon: "mdi:close-circle",
        };
      default:
        return {
          backgroundColor: excelTheme.colors.lightGray,
          color: "#000000",
          label: status,
          icon: null,
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: size === "small" ? "3px 6px" : "4px 8px",
        fontSize: size === "small" ? "10px" : "11px",
        fontWeight: 600,
        fontFamily: "Calibri, Arial, sans-serif",
        border: `1px solid ${statusStyle.color}`,
        borderRadius: 0, // Excel: sharp corners
        backgroundColor: statusStyle.backgroundColor,
        color: statusStyle.color,
      }}
    >
      {statusStyle.icon && (
        <Iconify 
          icon={statusStyle.icon} 
          width={size === "small" ? 12 : 14} 
        />
      )}
      {statusStyle.label}
    </Box>
  );
};
