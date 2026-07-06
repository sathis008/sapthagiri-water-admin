import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingInformationProps {
  capacity: string;

  price: number;

  bookingDate: string;

  onCapacityChange: (value: string) => void;

  onPriceChange: (value: number) => void;

  onBookingDateChange: (value: string) => void;
}

const BookingInformation = ({
  capacity,
  price,
  bookingDate,
  onCapacityChange,
  onPriceChange,
  onBookingDateChange,
}: BookingInformationProps) => {
  return (
    <div className="space-y-4 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Booking Information</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label>Capacity (Litres)</Label>

          <Input
            value={capacity}
            onChange={(e) => onCapacityChange(e.target.value)}
          />
        </div>

        <div>
          <Label>Price (₹)</Label>

          <Input
            type="number"
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Booking Date</Label>

          <Input
            type="date"
            value={bookingDate}
            onChange={(e) => onBookingDateChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingInformation;
