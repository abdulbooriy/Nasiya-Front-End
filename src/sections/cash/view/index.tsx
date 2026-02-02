import { CashView } from "./cash-view";
import ModalCash from "../modal/modal-cash";
import ModalCashInfo from "../modal/modal-cash-info";
import ModalCashReject from "../modal/modal-cash-reject";

export function CashesView() {

  return (
    <>
      <CashView />
      <ModalCash />
      <ModalCashInfo />
      <ModalCashReject />
    </>
  );
}
