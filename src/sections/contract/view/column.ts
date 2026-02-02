import type { Column } from "src/components/table/types";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { enqueueSnackbar } from "notistack";

export const columnsPageContract: Column[] = [
  {
    id: "day",
    label: "Kun",
    sortable: true,
    renderCell: (row) => {
      if (row.startDate) {
        const day = new Date(row.startDate).getDate();
        return day.toString().padStart(2, "0");
      }
      return "—";
    },
  },
  {
    id: "customId",
    label: "Shartnoma ID",
    sortable: true,
    width: 120,
    renderCell: (row) => {
      const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (row.customId) {
          navigator.clipboard.writeText(row.customId);
          enqueueSnackbar(`${row.customId} nusxa olindi`, { 
            variant: 'success',
            autoHideDuration: 2000,
          });
        }
      };

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{row.customId || "—"}</span>
          {row.customId && (
            <Tooltip title="Nusxa olish" arrow>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  p: 0.25,
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                    color: 'primary.main',
                  },
                }}
              >
                <MdContentCopy size={14} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      );
    },
  },
  {
    id: "customerName",
    label: "Mijoz",
    sortable: true,
    renderCell: (row) => {
      if (row.customerName && typeof row.customerName === "string") {
        const parts = row.customerName.split(" ");
        if (parts.length > 1 && !isNaN(Number(parts[0]))) {
          return parts.slice(1).join(" ");
        }
        return row.customerName;
      }
      return row.customerName || "—";
    },
  },
  { id: "productName", label: "Mahsulot Nomi", sortable: true },
  {
    id: "startDate",
    label: "Shartnoma Sanasi",
    format: (value: number) => value.toString().split("T")[0],
    sortable: true,
  },
  {
    id: "totalPrice",
    label: "Narxi",
    format: (value: number) => `${value.toLocaleString()} $`,
    sortable: true,
  },
  {
    id: "initialPayment",
    label: "Oldindan To'lov",
    format: (value: number) => `${value.toLocaleString()} $`,
    sortable: true,
  },

  {
    id: "monthlyPayment",
    label: "Oylik To'lov Miqdori",
    align: "center",
    format: (value: number) => `${value.toLocaleString()} $`,
    sortable: true,
  },
  {
    id: "totalPaid",
    label: "To'langan",
    align: "center",
    format: (value: number) => `${value?.toLocaleString() || 0} $`,
    sortable: true,
  },
  {
    id: "remainingDebt",
    label: "Qolgan qarz",
    align: "center",
    format: (value: number) => `${value?.toLocaleString() || 0} $`,
    sortable: true,
  },
];

export const columnsPageNewContract: Column[] = [
  { id: "productName", label: "Mahsulot Nomi", sortable: true },
  { id: "customerName", label: "Mijoz", sortable: true },
  { id: "sellerName", label: "Seller", sortable: true },
  {
    id: "price",
    label: "Narxi",
    format: (value: number) => `${value.toLocaleString()} $`,
    sortable: true,
  },
  {
    id: "initialPayment",
    label: "Oldindan To'lov",
    format: (value: number) => `${value.toLocaleString()} $`,
    sortable: true,
  },
  {
    id: "notes",
    label: "Izoh",
  },
  {
    id: "actions",
    label: "Amallar",
    align: "center",
  },
];
