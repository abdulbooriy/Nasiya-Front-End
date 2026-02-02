import type { RootState } from "src/store";
import type { IEmployee } from "src/types/employee";
import type { Column } from "src/components/table/types";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Stack, Button, Typography } from "@mui/material";

import { useTableLogic } from "src/hooks/useTableLogic";
import { useAppDispatch } from "src/hooks/useAppDispatch";

import { setModal } from "src/store/slices/modalSlice";
import { DashboardContent } from "src/layouts/dashboard";
import { getEmployees } from "src/store/actions/employeeActions";

import { setEmployeeId } from "src/store/slices/employeeSlice";

import { Iconify } from "src/components/iconify";
import Loader from "src/components/loader/Loader";
import { GenericTable } from "src/components/table/GnericTable";

import ActionEmployee from "../action/action-meneger";

const columns: Column[] = [
  { id: "firstName", label: "Ism", sortable: true },
  { id: "lastName", label: "Familiya", sortable: true },
  { id: "phoneNumber", label: "Telefon raqami", sortable: true },
  { id: "role", label: "Role", sortable: true },
];

export function EmployeesView() {
  const dispatch = useAppDispatch();
  const { employees, isLoading } = useSelector(
    (state: RootState) => state.employee
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
        <Box display="flex" alignItems="center">
          <Typography variant="h4" flexGrow={1}>
            Xodimlar
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => {
              dispatch(
                setModal({
                  modal: "employeeModal",
                  data: { type: "add", data: undefined },
                })
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
