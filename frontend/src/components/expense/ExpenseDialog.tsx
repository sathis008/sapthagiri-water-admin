import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";
import type { Expense } from "@/types/expense";

const ExpenseDialog = ({ open, onOpenChange, expense }: { open: boolean; onOpenChange: (open: boolean) => void; expense?: Expense | null }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[92vh] w-[94vw] max-w-none gap-0 overflow-hidden rounded-[1.25rem] p-0 sm:max-w-[92vw] sm:rounded-[1.75rem] lg:max-w-[58rem]">
      <DialogHeader className="border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-5"><DialogTitle>{expense ? "Edit Expense" : "Add Expense"}</DialogTitle></DialogHeader>
      <div className="max-h-[calc(92vh-73px)] overflow-y-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-6"><ExpenseForm expense={expense} onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} /></div>
    </DialogContent>
  </Dialog>
);
export default ExpenseDialog;
