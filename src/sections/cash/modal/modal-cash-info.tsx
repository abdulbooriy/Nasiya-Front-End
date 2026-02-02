import type { RootState } from "src/store";

import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import {
  MdCheckCircle,
  MdWarning,
  MdTrendingUp,
  MdAccessTime,
  MdCancel,
  MdInfo,
} from "react-icons/md";

import {
  Box,
  Chip,
  List,
  Stack,
  Button,
  Dialog,
  Avatar,
  Divider,
  ListItem,
  Typography,
  DialogTitle,
  ListItemText,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";

import { useAppDispatch } from "src/hooks/useAppDispatch";

import authApi from "src/server/auth";
import { closeModal } from "src/store/slices/modalSlice";
import { log } from "console";

const ModalCashInfo = () => {
  const dispatch = useAppDispatch();

  const { cashInfoModal } = useSelector((state: RootState) => state.modal);
  console.log(cashInfoModal);
  

  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const payment = cashInfoModal?.data as any;
  console.log(payment);
  

  const contractId = payment?.contractId;

  const handleClose = useCallback(() => {
    dispatch(closeModal("cashInfoModal"));
    setContract(null);
  }, [dispatch]);

  useEffect(() => {
    if (!contractId) {
      return;
    }

    const fetchContract = async () => {
      try {
        setLoading(true);
        
        
        // alert(contractId);
        const res = await authApi.get(
          `/contract/get-contract-by-id/${contractId}`,
        );
        // const res = await authApi.get(
        //   `/contract/get-contract-by-id/${contractId}`,
        // );
        
        
        setContract(res.data);
      } catch (error: any) {
        console.error("Error fetching contract:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContract();
  }, [contractId, cashInfoModal]);

  return (
    <Dialog
      open={!!cashInfoModal?.type}
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      PaperProps={{
        sx: { maxHeight: "70vh" },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>Shartnoma Ma'lumotlari</DialogTitle>
      <DialogContent sx={{ py: 1 }}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" p={2}>
            <CircularProgress size={32} />
          </Stack>
        ) : !contract ? (
          <Typography variant="body2" color="text.secondary">
            Ma'lumotlar topilmadi
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {/* Mijoz */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Shartnoma egasi:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {contract?.customer?.fullName || "—"}
              </Typography>
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            {/* Muddat */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Umumiy muddat:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {contract?.period || contract?.duration || "—"} oy
              </Typography>
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            {/* Qolgan oylar */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Qolgan oylar:
              </Typography>
              <Typography variant="body2" fontWeight={600} color="warning.main">
                {payment?.targetMonth
                  ? (contract?.period || contract?.duration) -
                    payment.targetMonth
                  : "—"}
              </Typography>
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            {/* Oylik to'lov */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Oylik to'lov:
              </Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">
                {contract?.monthlyPayment?.toLocaleString() || "0"} $
              </Typography>
            </Stack>

            <Divider sx={{ my: 0.5 }} />

            {/* Umumiy summa */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Umumiy summa:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {contract?.totalPrice?.toLocaleString() || "0"} $
              </Typography>
            </Stack>
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ pt: 1 }}>
        <Button size="small" color="error" onClick={handleClose}>
          Yopish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCashInfo;
