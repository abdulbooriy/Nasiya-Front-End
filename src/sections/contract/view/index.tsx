import type { TypedUseSelectorHook } from "react-redux";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { ContractsView } from "./contract-view";
import ContractDetails from "./contract-detail";
import ModalContract from "@/sections/contract/modal/modal-contract";
import type { RootState } from "@/store";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setContractId } from "@/store/slices/contractSlice";
import ModalCustomer from "@/sections/customer/modal/modal-customer";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function UsersView() {
  const dispatch = useAppDispatch();
  const { contractId } = useTypedSelector((state) => state.contract);

  useEffect(() => {
    dispatch(setContractId(null));
  }, [dispatch]);
  return (
    <>
      {contractId ?
        <ContractDetails />
      : <ContractsView />}
      <ModalContract />
      <ModalCustomer show />
    </>
  );
}
