export interface IDebt {
  _id: string;
  customerId: string;
  fullName: string;
  phoneNumber: string;
  totalPrice: number;
  totalPaid: number;
  remainingDebt: number;
  manager: string;
  status: string;
  nextPaymentDate: string;
  previousPaymentDate?: string;
  postponedAt?: string;

  activeContractsCount: number;
  productName: string;
  startDate: string;
  delayDays: number;
  initialPayment: number;

  // ✅ YANGI: To'lov progressi uchun
  monthlyPayment?: number;
  period?: number; // Shartnoma muddati (oylar)
  paidMonthsCount?: number; // To'langan oylar soni
  contracts?: Array<{
    _id: string;
    productName: string;
    monthlyPayment?: number;
    period?: number;
    paidMonthsCount?: number;
    [key: string]: any;
  }>; // Mijoz bo'yicha guruhlangan holat uchun

  [key: string]: any;
}
