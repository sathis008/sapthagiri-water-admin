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
      <DialogContent className="max-h-[92vh] w-[94vw] max-w-none gap-0 overflow-hidden rounded-[1.25rem] p-0 sm:max-w-[92vw] sm:rounded-[1.75rem] lg:max-w-[64rem] xl:max-w-[70rem]">
        <DialogHeader className="border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <DialogTitle className="text-lg font-semibold text-slate-950">
            {booking ? "Edit Booking" : "Create Booking"}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[calc(92vh-73px)] overflow-y-auto px-4 py-4 sm:px-6 lg:max-h-[calc(92vh-81px)] lg:px-8 lg:py-6">
          <BookingForm
            booking={booking}
            onSuccess={() => {
              onOpenChange(false);

              onSuccess?.();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
