import type { ICustomer } from "src/types/customer";
import type { Column } from "src/components/table/types";

import { useTableLogic } from "src/hooks/useTableLogic";
import { useAppDispatch } from "src/hooks/useAppDispatch";

import { updateCustomerManager } from "src/store/actions/customerActions";

import { GenericTable } from "src/components/table/GnericTable";

import ActionCustomer from "../action/action-curtomer";
import { ManagerSelectCell } from "./ManagerSelectCell";

interface CustomerTableProps {
  data: ICustomer[];
  columns: Column[];
  onRowClick: (row: ICustomer) => void;
  setSelectedRows?: (selected: string[]) => void;
  selectable?: boolean;
}

const CustomerTable = ({
  data,
  columns,
  onRowClick,
  selectable,
  setSelectedRows,
}: CustomerTableProps) => {
  const dispatch = useAppDispatch();
  const logic = useTableLogic<ICustomer>(data, columns);

  const handleManagerChange = (customerId: string, newManager: string) => {
    dispatch(updateCustomerManager(customerId, newManager));
  };

  const enhancedColumns = columns.map((col) => {
    if (col.id === "manager") {
      return {
        ...col,
        renderCell: (row: any) => (
          <ManagerSelectCell
            row={row}
            value={row.manager?._id || ""}
            onManagerChange={handleManagerChange}
          />
        ),
      };
    }
    return col;
  });

  return (
    <GenericTable
      data={data}
      selectable={selectable}
      columns={enhancedColumns}
      logic={logic}
      onRowClick={onRowClick}
      // onCustomerClick={onRowClick}
      setSelectedRows={setSelectedRows}
      renderActions={(row) => <ActionCustomer customer={row} />}
    />
  );
};

export default CustomerTable;
