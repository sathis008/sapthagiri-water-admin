import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPaymentByIdThunk } from "@/redux/payment";

interface PaymentViewProps {
  paymentId: string;
}

const PaymentView = ({ paymentId }: PaymentViewProps) => {
  const dispatch = useAppDispatch();

  const { selectedPayment, paymentItems, loading } = useAppSelector(
    (state) => state.payment,
  );

  useEffect(() => {
    dispatch(getPaymentByIdThunk(paymentId));
  }, [dispatch, paymentId]);

  if (loading) {
    return <div className="py-10 text-center">Loading payment details...</div>;
  }

  if (!selectedPayment) {
    return <div className="py-10 text-center">Payment not found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Payment Information */}

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-5 text-lg font-semibold">Payment Information</h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Payment No</p>

              <p className="font-semibold">{selectedPayment.paymentNumber}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Customer</p>

              <p className="font-semibold">{selectedPayment.customerName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Collected By</p>

              <p className="font-semibold">{selectedPayment.collectedBy}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Driver</p>

              <p className="font-semibold">
                {selectedPayment.driverName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Payment Mode</p>

              <p className="font-semibold">{selectedPayment.paymentMode}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Payment Date</p>

              <p className="font-semibold">
                {new Date(selectedPayment.paymentDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {selectedPayment.notes && (
            <>
              <Separator className="my-5" />

              <div>
                <p className="text-sm text-muted-foreground">Notes</p>

                <p>{selectedPayment.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Bookings */}

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-5 text-lg font-semibold">Booking Details</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-3 text-left">Booking No</th>

                  <th className="p-3 text-left">Booking Date</th>

                  <th className="p-3 text-left">Capacity</th>

                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {paymentItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-3">{item.bookingNumber}</td>

                    <td className="p-3">
                      {new Date(item.bookingDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{item.capacity} L</td>

                    <td className="p-3 text-right font-semibold text-green-600">
                      ₹{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={3} className="p-4 text-right font-bold">
                    Total
                  </td>

                  <td className="p-4 text-right text-xl font-bold text-green-600">
                    ₹{selectedPayment.totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentView;
