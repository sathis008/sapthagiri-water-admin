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

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: "bg-blue-100 text-blue-700",
  ASSIGNED: "bg-amber-100 text-amber-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const COLLECTION_LABELS: Record<string, string> = {
  DRIVER_COLLECTION: "Driver Collection",
  ACCOUNT_COLLECTION: "Account Collection",
  OFFICE_COLLECTION: "Office Collection",
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
        <Badge className={STATUS_STYLES[booking.status] ?? ""}>
          {booking.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Customer" value={booking.customerName} />
            <InfoRow label="Phone" value={booking.phone} />
            <InfoRow label="Address" value={booking.address} />
            <InfoRow
              label="Collection Method"
              value={
                booking.collectionMethod ? (
                  <Badge variant="outline">
                    {COLLECTION_LABELS[booking.collectionMethod] ??
                      booking.collectionMethod}
                  </Badge>
                ) : undefined
              }
            />
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="Booking No" value={booking.bookingNumber} />
            <InfoRow
              label="Booking Date"
              value={new Date(booking.bookingDate).toLocaleDateString("en-IN")}
            />
            <InfoRow label="Capacity" value={`${booking.capacity} L`} />
            <InfoRow
              label="Price"
              value={`₹ ${booking.price.toLocaleString("en-IN")}`}
            />
            <InfoRow
              label="Payment"
              value={
                <Badge
                  className={
                    booking.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }
                >
                  {booking.paymentStatus}
                </Badge>
              }
            />
            <InfoRow
              label="Last Updated"
              value={new Date(booking.updatedAt).toLocaleString("en-IN")}
            />
          </CardContent>
        </Card>

        {/* Assignment */}
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
                  <Badge className="bg-amber-100 text-amber-700">
                    Assigned
                  </Badge>
                ) : (
                  <Badge variant="secondary">Not Assigned</Badge>
                )
              }
            />
            <InfoRow
              label="Last Updated"
              value={new Date(booking.updatedAt).toLocaleString("en-IN")}
            />
          </CardContent>
        </Card>

        {/* Delivery Details */}
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
              value={new Date(booking.updatedAt).toLocaleString("en-IN")}
            />
          </CardContent>
        </Card>

        {/* Notes */}
        {booking.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700">{booking.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingView;
