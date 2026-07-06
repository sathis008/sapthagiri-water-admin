import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Booking } from "@/types/booking";

import CompleteDeliveryForm from "./form/CompleteDeliveryForm";

interface CompleteDeliveryDialogProps {
  open: boolean;

  booking: Booking | null;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;
}

const CompleteDeliveryDialog = ({
  open,
  booking,
  onOpenChange,
  onSuccess,
}: CompleteDeliveryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Complete Delivery</DialogTitle>
        </DialogHeader>

        {booking && (
          <CompleteDeliveryForm
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

export default CompleteDeliveryDialog;
