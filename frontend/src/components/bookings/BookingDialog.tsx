import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Booking } from "@/types/booking";

import BookingForm from "./form/BookingForm";

interface BookingDialogProps {
  open: boolean;

  booking?: Booking | null;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;
}

const BookingDialog = ({
  open,
  booking,
  onOpenChange,
  onSuccess,
}: BookingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {booking ? "Edit Booking" : "Create Booking"}
          </DialogTitle>
        </DialogHeader>

        <BookingForm
          booking={booking}
          onSuccess={() => {
            onOpenChange(false);

            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
