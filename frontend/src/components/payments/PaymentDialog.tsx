import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaymentForm from "./PaymentForm";

interface PaymentDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;
}

const PaymentDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[94vw] max-w-none overflow-hidden p-0 sm:max-w-[90vw] lg:max-w-5xl">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Receive Payment</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          <PaymentForm
            key={open ? "open" : "closed"}
            onSuccess={() => {
              onOpenChange(false);
              onSuccess();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
