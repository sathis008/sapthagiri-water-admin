import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Booking } from "@/types/booking";

import AssignBookingForm from "./form/AssignBookingForm";

interface AssignBookingDialogProps {
  open: boolean;

  booking: Booking | null;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;
}

const AssignBookingDialog = ({
  open,
  booking,
  onOpenChange,
  onSuccess,
}: AssignBookingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign & Deliver Booking</DialogTitle>
        </DialogHeader>

        {booking && (
          <AssignBookingForm
            booking={booking}
            onSuccess={() => {
              onOpenChange(false);

              onSuccess?.();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AssignBookingDialog;
