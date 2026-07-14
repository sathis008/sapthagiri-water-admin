import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Booking } from "@/types/booking";

import EditBookingForm from "./form/EditBookingForm";

interface EditBookingDialogProps {
  open: boolean;
  booking: Booking | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const EditBookingDialog = ({
  open,
  booking,
  onOpenChange,
  onSuccess,
}: EditBookingDialogProps) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[94vw] max-w-none overflow-y-auto rounded-[1.5rem] lg:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>

        <EditBookingForm
          booking={booking}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
