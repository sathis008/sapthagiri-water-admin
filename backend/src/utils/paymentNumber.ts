import Payment from "../models/payment.model";

export const generatePaymentNumber = async () => {
  const count = await Payment.countDocuments();

  return `PAY${String(count + 1).padStart(6, "0")}`;
};
