import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/DataTable";
import type { Expense } from "@/types/expense";
import ExpenseRowActions from "./ExpenseRowActions";

const vehicleNumber = (expense: Expense) => typeof expense.vehicleId === "object" && expense.vehicleId ? expense.vehicleId.vehicleNumber : "-";
const driverName = (expense: Expense) => typeof expense.driverId === "object" && expense.driverId ? expense.driverId.name : "-";
export const expenseColumns = (onEdit: (expense: Expense) => void, onDelete: (expense: Expense) => void): ColumnDef<Expense>[] => [
  { accessorKey: "expenseDate", header: ({ column }) => <DataTableColumnHeader column={column} title="Expense Date" />, cell: ({ row }) => new Date(row.original.expenseDate).toLocaleDateString() },
  { accessorKey: "expenseCategory", header: ({ column }) => <DataTableColumnHeader column={column} title="Expense Category" /> },
  { accessorKey: "expenseSubCategory", header: ({ column }) => <DataTableColumnHeader column={column} title="Expense Sub Category" /> },
  { id: "vehicle", header: "Vehicle", cell: ({ row }) => vehicleNumber(row.original) },
  { id: "driver", header: "Driver", cell: ({ row }) => driverName(row.original) },
  { accessorKey: "amount", header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />, cell: ({ row }) => `₹${Number(row.original.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` },
  { id: "actions", enableSorting: false, enableHiding: false, header: "Actions", cell: ({ row }) => <ExpenseRowActions expense={row.original} onEdit={onEdit} onDelete={onDelete} /> },
];
