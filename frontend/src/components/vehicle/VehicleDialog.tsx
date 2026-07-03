import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import VehicleForm from "./form/VehicleForm";

import type { Vehicle } from "@/types/vehicle";

interface VehicleDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  vehicle?: Vehicle | null;
}

const VehicleDialog = ({
  open,
  onOpenChange,
  vehicle,
}: VehicleDialogProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[92vh] w-[94vw] max-w-none gap-0 overflow-hidden rounded-[1.25rem] p-0 sm:max-w-[92vw] sm:rounded-[1.75rem] lg:max-w-[64rem] xl:max-w-[70rem]">

        <DialogHeader className="border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">

          <DialogTitle className="text-lg font-semibold text-slate-950">
            {vehicle
              ? "Edit Vehicle"
              : "Add Vehicle"}
          </DialogTitle>

        </DialogHeader>

        <div className="max-h-[calc(92vh-73px)] min-h-0 overflow-y-auto px-4 py-4 sm:px-6 lg:max-h-[calc(92vh-81px)] lg:px-8 lg:py-6">

          <VehicleForm
            vehicle={vehicle}
            onSuccess={handleSuccess}
            onCancel={() =>
              onOpenChange(false)
            }
          />

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;