import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useAppDispatch } from "@/redux/hooks";
import { deletePaymentThunk } from "@/redux/payment";

interface DeletePaymentDialogProps {
  open: boolean;

  paymentId: string | null;

  onOpenChange: (open: boolean) => void;

  onSuccess: () => void;
}

const DeletePaymentDialog = ({
  open,
  paymentId,
  onOpenChange,
  onSuccess,
}: DeletePaymentDialogProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!paymentId) return;

    try {
      await dispatch(deletePaymentThunk(paymentId)).unwrap();

      onOpenChange(false);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Payment?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete this payment and all linked bookings
            will become <b>PENDING</b> again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePaymentDialog;
