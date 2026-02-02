import type { ICustomer } from "./customer";

export interface IPayment {
  amount: number;
  date: Date;
  method?: string;
  isPaid: boolean;
  paymentType: "initial" | "monthly" | "extra"; 
  paymentMethod?: string; // ✅ YANGI: To'lov usuli
  notes: string;
  _id: string;
  status?: "PAID" | "PENDING" | "REJECTED" | "UNDERPAID" | "OVERPAID"; // YANGI
  confirmedAt?: Date; 
  confirmedBy?: string; 
  remainingAmount?: number;
  excessAmount?: number;
  expectedAmount?: number;
}

export interface IContractInfo {
  box: boolean;
  mbox: boolean;
  receipt: boolean;
  iCloud: boolean;
}

export interface IContractChange {
  field: string;
  oldValue: number;
  newValue: number;
  difference: number;
}

export interface IImpactSummary {
  underpaidCount: number;
  overpaidCount: number;
  totalShortage: number;
  totalExcess: number;
  additionalPaymentsCreated: number;
}

export interface IContractEdit {
  date: string;
  editedBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  changes: IContractChange[];
  affectedPayments: string[];
  impactSummary: IImpactSummary;
}

export interface IContract {
  customId?: string; // ✅ YANGI: Custom contract ID (26T00001 formatida)
  customer?: ICustomer;
  productName: string;
  originalPrice: number;
  price: number;
  initialPayment: number;
  percentage: number;
  period: number;
  initialPaymentDueDate: string;
  monthlyPayment: number;
  notes: string;
  totalPrice: number;

  startDate: string;
  _id: string;
  clientId: string;
  remainingDebt: number;
  totalPaid: number;
  nextPaymentDate: string;
  previousPaymentDate?: string; 
  postponedAt?: string;
  originalPaymentDay?: number; // ✅ TUZATISH: To'lov kuni (1-31)
  isActive: boolean;
  isDelete: boolean;
  status: "active" | "completed" | "cancelled";
  payments: IPayment[] | [];
  info: IContractInfo;
  prepaidBalance?: number;
  editHistory?: IContractEdit[];
}

export interface IAddContract {
  customer: string;
  customId?: string; // ✅ YANGI: Shartnoma ID (ixtiyoriy)
  productName: string;
  originalPrice: number;
  price: number;
  initialPayment: number;
  percentage: number;
  period: number;
  initialPaymentDueDate: string;
  monthlyPayment: number;
  notes: string;
  box: boolean;
  mbox: boolean;
  receipt: boolean;
  iCloud: boolean;
  totalPrice: number;
}

export interface IEditContract extends IAddContract {
  id: string;
}
