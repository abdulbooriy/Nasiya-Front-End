import type { RootState } from "@/store";
import type { IEmployee } from "@/types/employee";
import type { Column } from "@/components/table/types";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Stack, Button, Typography } from "@mui/material";

import { useTableLogic } from "@/hooks/useTableLogic";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { setModal } from "@/store/slices/modalSlice";
import { DashboardContent } from "@/layouts/dashboard";
import { getEmployees } from "@/store/actions/employeeActions";

import { setEmployeeId } from "@/store/slices/employeeSlice";

import { Iconify } from "@/components/iconify";
import Loader from "@/components/loader/Loader";
import { GenericTable } from "@/components/table/GnericTable";

import ActionEmployee from "@/sections/employee/action/action-meneger";

const columns: Column[] = [
  { id: "firstName", label: "Ism", sortable: true },
  { id: "lastName", label: "Familiya", sortable: true },
  { id: "phoneNumber", label: "Telefon raqami", sortable: true },
  { id: "role", label: "Role", sortable: true },
];

export function EmployeesView() {
  const dispatch = useAppDispatch();
  const { employees, isLoading } = useSelector(
    (state: RootState) => state.employee,
  );
  const logic = useTableLogic<IEmployee>(employees, columns);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  if (employees.length === 0 && isLoading) {
    return <Loader />;
  }
  return (
    <DashboardContent>
      <Stack spacing={5}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            // variant="h4"
            sx={{
              fontSize: "1.5rem", // text-2xl
              fontWeight: 900, // font-black
              color: "#000000", // text-black
              letterSpacing: "-0.025em", // tracking-tight
            }}
            flexGrow={1}
          >
            Xodimlar
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              backgroundColor: "#1C1C1E",
              color: "#FFFFFF",
              px: "20px", // px-5
              py: "10px", // py-2.5
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.75rem", // text-xs
              fontWeight: 900, // font-black
              textTransform: "uppercase",
              letterSpacing: "0.1em", // tracking-widest
              transition: "all 0.2s ease",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", // shadow-lg + shadow-black/10
              "&:hover": {
                backgroundColor: "#000000",
              },
            }}
            startIcon={<Iconify icon="mingcute:add-line" width={16} height={16}/>}
            onClick={() => {
              dispatch(
                setModal({
                  modal: "employeeModal",
                  data: { type: "add", data: undefined },
                }),
              );
            }}
          >
            Qo&apos;shish
          </Button>
        </Box>

        <GenericTable
          data={employees}
          columns={columns}
          logic={logic}
          onRowClick={(row) => dispatch(setEmployeeId(row._id))}
          renderActions={(row) => <ActionEmployee employee={row} />}
        />
      </Stack>
    </DashboardContent>
  );
}
