import { Badge } from "@/components/ui/badge";

import type { Payment } from "@/types/payment";

interface RecentPaymentsProps {
  payments: Payment[];
}

const RecentPayments = ({ payments }: RecentPaymentsProps) => {
  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div>
          <h2 className="text-lg font-semibold">Recent Payments</h2>

          <p className="text-sm text-muted-foreground">
            Latest received payments
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Receipt</th>

              <th className="px-4 py-2 text-left text-sm">Customer</th>

              <th className="px-4 py-2 text-left text-sm">Payment Mode</th>

              <th className="px-4 py-2 text-left text-sm">Collected By</th>

              <th className="px-4 py-2 text-right text-sm">Amount</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment._id}
                className="border-t transition-colors hover:bg-muted/40"
              >
                <td className="px-4 py-2 text-sm">{payment.paymentNumber}</td>

                <td className="px-4 py-2 text-sm">{payment.customerName}</td>

                <td className="px-4 py-2 text-sm">
                  <Badge variant="secondary">{payment.paymentMode}</Badge>
                </td>

                <td className="px-4 py-2 text-sm">{payment.collectedBy}</td>

                <td className="px-4 py-2 text-right  text-green-600 text-sm">
                  ₹{payment.totalAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPayments;
