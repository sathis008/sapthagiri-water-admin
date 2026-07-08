import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Payment } from "@/types/payment";

interface PaymentColumnsProps {
  onView: (payment: Payment) => void;

  onDelete: (payment: Payment) => void;
}

export const paymentColumns = ({
  onView,
  onDelete,
}: PaymentColumnsProps): ColumnDef<Payment>[] => [
  {
    accessorKey: "paymentNumber",
    header: "Payment No",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-green-600">
        ₹{row.original.totalAmount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "collectedBy",
    header: "Collected By",
    cell: ({ row }) => {
      const value = row.original.collectedBy;

      return (
        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium">
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
    cell: ({ row }) => {
      const value = row.original.paymentMode;

      return (
        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => new Date(row.original.paymentDate).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(payment)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(payment)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
