import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Booking } from "@/types/booking";

interface BookingViewProps {
  booking: Booking;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between border-b py-3 last:border-b-0">
    <span className="text-sm font-medium text-muted-foreground">{label}</span>

    <span className="text-sm font-semibold text-right">{value || "-"}</span>
  </div>
);

const getStatusVariant = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";

    case "ASSIGNED":
      return "bg-orange-100 text-orange-700";

    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "";
  }
};

const BookingView = ({ booking }: BookingViewProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{booking.bookingNumber}</h2>

          <p className="text-sm text-muted-foreground">Booking Details</p>
        </div>

        <Badge className={getStatusVariant(booking.status)}>
          {booking.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Card */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>

          <CardContent>
            <InfoRow label="Customer" value={booking.customerName} />

            <InfoRow label="Phone" value={booking.phone} />

            <InfoRow label="Address" value={booking.address} />
          </CardContent>
        </Card>
        {/* Booking Card */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>

          <CardContent>
            <InfoRow label="Booking No" value={booking.bookingNumber} />

            <InfoRow
              label="Booking Date"
              value={new Date(booking.bookingDate).toLocaleDateString()}
            />

            <InfoRow label="Capacity" value={`${booking.capacity} L`} />

            <InfoRow label="Price" value={`₹ ${booking.price}`} />

            <InfoRow
              label="Payment"
              value={
                <Badge
                  variant={
                    booking.paymentStatus === "PAID" ? "default" : "secondary"
                  }
                >
                  {booking.paymentStatus}
                </Badge>
              }
            />

            <InfoRow
              label="Last Updated"
              value={new Date(booking.updatedAt).toLocaleString()}
            />
          </CardContent>
        </Card>

        {/* Assignment Card */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>

          <CardContent>
            <InfoRow label="Driver" value={booking.driverName} />

            <InfoRow label="Vehicle" value={booking.vehicleNumber} />

            <InfoRow
              label="Status"
              value={
                booking.driverName ? (
                  <Badge className="bg-orange-100 text-orange-700">
                    Assigned
                  </Badge>
                ) : (
                  <Badge variant="secondary">Not Assigned</Badge>
                )
              }
            />

            <InfoRow
              label="Last Updated"
              value={new Date(booking.updatedAt).toLocaleString()}
            />
          </CardContent>
        </Card>

        {/* Delivery Card */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>

          <CardContent>
            <InfoRow label="Collection" value={booking.collectionMethod} />

            <InfoRow label="Notes" value={booking.notes} />

            <InfoRow
              label="Status"
              value={
                booking.status === "DELIVERED" ? (
                  <Badge className="bg-green-100 text-green-700">
                    Delivered
                  </Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )
              }
            />

            <InfoRow
              label="Last Updated"
              value={new Date(booking.updatedAt).toLocaleString()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingView;
