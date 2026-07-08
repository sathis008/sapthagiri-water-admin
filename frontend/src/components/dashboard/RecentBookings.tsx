import { Badge } from "@/components/ui/badge";

import type { Booking } from "@/types/booking";

interface RecentBookingsProps {
  bookings: Booking[];
}

const statusVariant = {
  CONFIRMED: "secondary",
  ASSIGNED: "default",
  DELIVERED: "default",
  CANCELLED: "destructive",
} as const;

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-2">
        <div>
          <h2 className="text-lg font-semibold">Recent Bookings</h2>

          <p className="text-sm text-muted-foreground">
            Latest bookings created
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Booking</th>

              <th className="px-4 py-2 text-left text-sm">Customer</th>

              <th className="px-4 py-2 text-left text-sm">Date</th>

              <th className="px-4 py-2 text-right text-sm">Amount</th>

              <th className="px-4 py-2 text-center text-sm">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t transition-colors hover:bg-muted/40"
              >
                <td className="px-4 py-2 text-sm">{booking.bookingNumber}</td>

                <td className="px-4 py-2 text-sm">{booking.customerName}</td>

                <td className="px-4 py-2 text-sm">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 text-right text-sm">
                  ₹{booking.price.toLocaleString()}
                </td>

                <td className="px-4 py-2 text-center text-sm">
                  <Badge
                    variant={
                      statusVariant[
                        booking.status as keyof typeof statusVariant
                      ]
                    }
                  >
                    {booking.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
