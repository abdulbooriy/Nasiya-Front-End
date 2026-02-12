import authApi from "@/server/auth"

import { enqueueSnackbar } from "@/store/slices/snackbar";
import type { AppThunk } from "@/store";

interface PaymentData {
  id: string; 
  amount: number;
  notes?: string;
  currencyDetails: {
    dollar: number;
    sum: number;
  };
  currencyCourse: number;
}

export const makePayment =
  (data: PaymentData, onSuccess?: () => void): AppThunk =>
  async (dispatch) => {
    try {
      const res = await authApi.put("/payment", data);

      dispatch(
        enqueueSnackbar({
          message: res.data.message || "To'lov muvaffaqiyatli amalga oshirildi",
          options: { variant: "success" },
        })
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "To'lov amalga oshirilmadi";
      const errorMessages: string[] = error.response?.data?.errors || [];

      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );

      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((err) => {
          dispatch(
            enqueueSnackbar({
              message: err,
              options: { variant: "error" },
            })
          );
        });
      }
    }
  };

export const getPaymentHistory =
  (customerId?: string, contractId?: string): AppThunk =>
  async (dispatch) => {
    try {
      const params = new URLSearchParams();
      if (customerId) params.append("customerId", customerId);
      if (contractId) params.append("contractId", contractId);

      const res = await authApi.get(`/payment/history?${params.toString()}`);
      return res.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "To'lov tarixini olishda xatolik";

      dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" },
        })
      );
      return [];
    }
  };
