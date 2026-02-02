import type { IContract } from "src/types/contract";

import React, { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Stack,
  Button,
  Checkbox,
  Accordion,
  TextField,
  Typography,
  IconButton,
  AccordionDetails,
  FormControlLabel,
  AccordionSummary,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { useAppDispatch } from "src/hooks/useAppDispatch";

import { formatNumber } from "src/utils/format-number";

import { grey } from "src/theme/core";
import { setModal } from "src/store/slices/modalSlice";

import { Iconify } from "../iconify";
import { useSelector } from "react-redux";
import type { RootState } from "src/store";

interface IReadOnlyTextFieldProps {
  value: string | number;
  label: string;
}

const ReadOnlyTextField = ({ value, label }: IReadOnlyTextFieldProps) => (
  <TextField
    value={value}
    margin="dense"
    label={label}
    fullWidth
    disabled
    InputProps={{
      sx: {
        color: "black",
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "black",
        },
      },
    }}
    InputLabelProps={{
      shrink: true,
      sx: {
        color: "black",
        "&.Mui-disabled": {
          color: "black",
        },
      },
    }}
  />
);

interface IProps {
  contract: IContract;
  showName?: boolean;
  readOnly?: boolean;
  onEditDate?: () => void;
}

const RenderContractFields: React.FC<IProps> = ({
  contract,
  showName = false,
  readOnly = false,
  onEditDate,
}) => {
  const dispatch = useAppDispatch();
  
  // ✅ Role tekshirish - faqat admin va moderator edit qila oladi
  const { profile } = useSelector((state: RootState) => state.auth);
  const userRole = (typeof profile?.role === 'string' ? profile.role : (profile?.role as any)?.name)?.toLowerCase();
  const canEditContract = userRole === "admin" || userRole === "moderator";
  
  const { paymentDeadline } = useMemo(() => {
    try {
      // contract.startDate ni tekshirish
      if (!contract.startDate) {
        return { paymentDeadline: "" };
      }

      const deadlineDate = new Date(contract.startDate);
      
      // Invalid date tekshirish
      if (isNaN(deadlineDate.getTime())) {
        console.warn("Invalid startDate:", contract.startDate);
        return { paymentDeadline: "" };
      }

      deadlineDate.setMonth(deadlineDate.getMonth() + (contract.period || 0));

      return {
        paymentDeadline: deadlineDate.toISOString().split("T")[0],
      };
    } catch (error) {
      console.error("Error calculating payment deadline:", error);
      return { paymentDeadline: "" };
    }
  }, [contract]);
  const dateFormat = (dateString: string) => dateString?.split("T")[0] || "";

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        mb={2}
      >
        <Typography variant="h6">Shartnoma ma&#39;lumotlari</Typography>
        {/* ✅ Edit faqat admin va moderator uchun */}
        {!readOnly && canEditContract && (
          <Stack direction="row" spacing={1}>
            {onEditDate && (
              <Button
                variant="contained"
                size="small"
                onClick={onEditDate}
                startIcon={<Iconify icon="solar:calendar-date-bold-duotone" width={18} />}
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  px: 1.5,
                  borderRadius: 1,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    color: 'primary.darker',
                    transform: 'translateY(-1px)',
                    boxShadow: 'none',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Sana
              </Button>
            )}
            
            <IconButton
              aria-label="update"
              size="small"
              onClick={() => {
                dispatch(
                  setModal({
                    modal: "contractModal",
                    data: { type: "edit", data: contract },
                  })
                );
              }}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Stack>
        )}
      </Stack>

      {showName && (
        <Grid xs={12}>
          <ReadOnlyTextField
            value={contract.productName}
            label="Mahsulot nomi"
          />
        </Grid>
      )}
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.originalPrice ? formatNumber(contract.originalPrice) : "—"}
          label="Asl narxi"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.price ? formatNumber(contract.price) : "—"}
          label="Sotuv narxi"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.initialPayment ? formatNumber(contract.initialPayment) : "—"}
          label={`Oldindan to'lov`}
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.initialPaymentDueDate ? dateFormat(contract.initialPaymentDueDate) : "—"}
          label="Oldindan to'lov sanasi"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.percentage ? formatNumber(contract.percentage) : "—"}
          label="Foiz"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.period ? formatNumber(contract.period) : "—"}
          label="Muddat (oy)"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.monthlyPayment ? formatNumber(contract.monthlyPayment) : "—"}
          label={`Oylik to'lov`}
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.totalPrice ? formatNumber(contract.totalPrice) : "—"}
          label="Umumiy narx"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.totalPaid !== undefined && contract.totalPaid !== null ? formatNumber(contract.totalPaid) : "—"}
          label="To'langan summa"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.remainingDebt !== undefined && contract.remainingDebt !== null ? formatNumber(contract.remainingDebt) : "—"}
          label="Qolgan summa"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={contract.startDate ? dateFormat(contract.startDate) : "—"}
          label="Shartnoma sanasi"
        />
      </Grid>
      <Grid xs={6} md={4}>
        <ReadOnlyTextField
          value={paymentDeadline || "—"}
          label="To'lov muddati"
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          value={contract.notes || ""}
          label="Izoh"
          fullWidth
          multiline
          rows={6}
          margin="dense"
          disabled
          InputProps={{
            sx: {
              color: "black",
              maxHeight: "200px",
              overflow: "auto",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
              },
            },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              color: "black",
              "&.Mui-disabled": {
                color: "black",
              },
            },
          }}
        />
      </Grid>
      <Grid xs={12}>
        <Accordion
          sx={{
            mt: 2,
            bgcolor: grey[300],
            borderRadius: 0,
          }}
        >
          <AccordionSummary expandIcon={<FaChevronDown />}>
            <Typography variant="subtitle1">
              Qo&lsquo;shimcha ma&#39;lumotlar
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox checked={contract.info?.box || false} readOnly name="box" />
                  }
                  label="Karobka"
                />
              </Grid>
              <Grid xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={contract.info?.mbox || false}
                      readOnly
                      name="mbox"
                    />
                  }
                  label="Muslim karobka"
                />
              </Grid>
              <Grid xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={contract.info?.receipt || false}
                      readOnly
                      name="receipt"
                    />
                  }
                  label="Tilxat"
                />
              </Grid>
              <Grid xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={contract.info?.iCloud || false}
                      readOnly
                      name="icloud"
                    />
                  }
                  label="iCloud"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
};

export default RenderContractFields;
