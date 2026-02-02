import { useEffect } from "react";

import { useAppDispatch } from "src/hooks/useAppDispatch";

import { setCustomerId } from "src/store/slices/customerSlice";
import { getManagers } from "src/store/actions/employeeActions";

import { DebtorView } from "./debtor-view";

export function UsersView() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getManagers());

    return () => {
      dispatch(setCustomerId(null));
    };
  }, [dispatch]);

  return <DebtorView />;
}
