import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import type { Vehicle } from "@/types/vehicle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppSelector } from "@/redux/hooks";
import { canDelete } from "@/utills/auth";

interface VehicleRowActionsProps {
  vehicle: Vehicle;
  onView: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

const VehicleRowActions = ({
  vehicle,
  onView,
  onEdit,
  onDelete,
}: VehicleRowActionsProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const showDelete = canDelete(user?.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(vehicle)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(vehicle)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        {showDelete && (
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onDelete(vehicle)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VehicleRowActions;
