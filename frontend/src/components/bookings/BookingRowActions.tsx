import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Truck,
  CircleCheckBig,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Booking } from "@/types/booking";
import { useAppSelector } from "@/redux/hooks";
import { canDelete } from "@/utills/auth";

interface BookingRowActionsProps {
  booking: Booking;
  onView: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
  onAssign: (booking: Booking) => void;
  onComplete: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}

const BookingRowActions = ({
  booking,
  onView,
  onEdit,
  onAssign,
  onComplete,
  onDelete,
}: BookingRowActionsProps) => {
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
        <DropdownMenuItem onClick={() => onView(booking)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(booking)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        {/* Assign only available when status is CONFIRMED */}
        {booking.status === "CONFIRMED" && (
          <DropdownMenuItem onClick={() => onAssign(booking)}>
            <Truck className="mr-2 h-4 w-4" />
            Assign
          </DropdownMenuItem>
        )}

        {booking.status === "ASSIGNED" && (
          <DropdownMenuItem onClick={() => onComplete(booking)}>
            <CircleCheckBig className="mr-2 h-4 w-4" />
            Complete Delivery
          </DropdownMenuItem>
        )}

        {showDelete && (
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onDelete(booking)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookingRowActions;
