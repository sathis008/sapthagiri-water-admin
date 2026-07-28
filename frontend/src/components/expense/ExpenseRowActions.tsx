import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { canDelete } from "@/utills/auth";
import type { Expense } from "@/types/expense";

const ExpenseRowActions = ({ expense, onEdit, onDelete }: { expense: Expense; onEdit: (expense: Expense) => void; onDelete: (expense: Expense) => void }) => {
  const { user } = useAppSelector((state) => state.auth);
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => onEdit(expense)}><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>{canDelete(user?.role) && <DropdownMenuItem className="text-red-600" onClick={() => onDelete(expense)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>}</DropdownMenuContent></DropdownMenu>;
};
export default ExpenseRowActions;
