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

import type { Customer } from "@/types/customer";

interface Props {
  open: boolean;
  customer: Customer | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteCustomerDialog = ({
  open,
  customer,
  onOpenChange,
  onConfirm,
}: Props) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Customer
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong>{customer?.name}</strong>?

            <br />

            This action cannot be undone.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerDialog;