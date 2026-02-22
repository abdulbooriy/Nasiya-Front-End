import type { IEmployee } from "@/types/employee"

import { useState, useCallback } from "react";
import { MdDelete, MdWarning } from "react-icons/md";

import {
  Box,
  Stack,
  Dialog,
  Button,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import { useAppDispatch } from "@/hooks/useAppDispatch"

import { setModal } from "@/store/slices/modalSlice"
import { deleteEmployes } from "@/store/actions/employeeActions"

import { Iconify } from "@/components/iconify"

export default function ActionEmployee({ employee }: { employee: IEmployee }) {
  const dispatch = useAppDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSelect = useCallback(() => {
    dispatch(
      setModal({
        modal: "employeeModal",
        data: { type: "edit", data: employee },
      })
    );
  }, [dispatch, employee]);

  const handleDelete = useCallback(() => {
    dispatch(deleteEmployes(employee._id));
    setOpenConfirm(false);
  }, [dispatch, employee]);

  return (
    <Box>
      <IconButton onClick={handleSelect}>
        <Iconify icon="solar:pen-bold" />
      </IconButton>

      <IconButton onClick={() => setOpenConfirm(true)} color="error">
        <Iconify icon="solar:trash-bin-trash-bold" />
      </IconButton>

      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MdWarning color="var(--palette-warning-main)" size={24} />
          Xodimni o&lsquo;chirish
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Haqiqatan ham xodimni o&lsquo;chirmoqchimisiz?
          </DialogContentText>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "rgba(var(--palette-error-mainChannel) / 0.1)",
              borderRadius: 0,
              border: "1px solid",
              borderColor: "rgba(var(--palette-error-mainChannel) / 0.3)",
            }}
          >
            <Stack spacing={1}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Xodim:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {employee.fullName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Rol:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {employee.role || "—"}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              bgcolor: "rgba(var(--palette-error-mainChannel) / 0.1)",
              borderRadius: 0,
            }}
          >
            <MdWarning size={18} color="var(--palette-error-main)" />
            <Typography
              variant="caption"
              color="error.main"
              fontWeight="medium"
            >
              Diqqat: Bu amalni bekor qilib bo&lsquo;lmaydi!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenConfirm(false)}
            color="inherit"
            variant="outlined"
          >
            Bekor qilish
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<MdDelete />}
          >
            O&lsquo;chirish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
