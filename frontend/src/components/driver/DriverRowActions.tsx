import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Driver } from '@/types/driver';

interface DriverRowActionsProps {
  driver: Driver;

  onView: (driver: Driver) => void;

  onEdit: (driver: Driver) => void;

  onDelete: (driver: Driver) => void;
}

const DriverRowActions = ({ driver, onView, onEdit, onDelete }: DriverRowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(driver)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(driver)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(driver)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DriverRowActions;
