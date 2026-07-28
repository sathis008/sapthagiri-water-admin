import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createExpenseThunk, getExpensesThunk, updateExpenseThunk } from "@/redux/expense";
import { getEmployeesThunk } from "@/redux/driver";
import type { Expense, ExpenseCategory, ExpensePayload } from "@/types/expense";

const subCategories: Record<ExpenseCategory, string[]> = {
  "Vehicle Expense": ["Vehicle Maintenance", "Vehicle Expense", "RTO", "Fast Tag", "Insurance", "Other Point Expense"],
  "Office Expense": ["Office Expense", "Tyre", "LIC Expense", "Point Expense", "Bill Book Printing", "Mobile Expense", "Pandurangan"],
  "Salary Expense": ["Office", "Driver"],
};
const vehicleSubs = subCategories["Vehicle Expense"];
const withVendor = ["Vehicle Maintenance", "RTO", "Fast Tag", "Insurance", "Other Point Expense", "Tyre", "Bill Book Printing"];
const formatDate = (value?: string | null) => value ? new Date(value).toISOString().slice(0, 10) : "";
const objectId = (value: unknown) => typeof value === "object" && value !== null && "_id" in value ? String(value._id) : value ? String(value) : "";

const ExpenseForm = ({ expense, onSuccess, onCancel }: { expense?: Expense | null; onSuccess: () => void; onCancel: () => void }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.expense);
  const { vehicles } = useAppSelector((state) => state.vehicle);
  const { drivers, employees } = useAppSelector((state) => state.driver);

  useEffect(() => { dispatch(getEmployeesThunk({ limit: 100 })); }, [dispatch]);
  const form = useForm<ExpensePayload>({ defaultValues: { expenseCategory: undefined, expenseSubCategory: "", vehicleId: null, driverId: null, employeeName: "", vendor: "", notes: "", amount: null, spareAmount: null, labourAmount: null, diesel: null, dieselAmount: null, mileage: null, count: null, month: "", expiryDate: "", expenseDate: formatDate(new Date().toISOString()) } });
  const category = useWatch({ control: form.control, name: "expenseCategory" });
  const subCategory = useWatch({ control: form.control, name: "expenseSubCategory" });
  const spareAmount = Number(useWatch({ control: form.control, name: "spareAmount" }) || 0);
  const labourAmount = Number(useWatch({ control: form.control, name: "labourAmount" }) || 0);
  const maintenance = subCategory === "Vehicle Maintenance";

  useEffect(() => {
    if (!expense) return;
    form.reset({ ...expense, vehicleId: objectId(expense.vehicleId), driverId: objectId(expense.driverId), expenseDate: formatDate(expense.expenseDate), expiryDate: formatDate(expense.expiryDate) } as ExpensePayload);
  }, [expense, form]);

  const resetConditionalFields = () => ["vehicleId", "driverId", "employeeName", "vendor", "amount", "spareAmount", "labourAmount", "diesel", "dieselAmount", "mileage", "count", "month", "expiryDate"].forEach((field) => form.setValue(field as keyof ExpensePayload, null as never));

  const onSubmit = async (values: ExpensePayload) => {
    const required: Array<[keyof ExpensePayload, string]> = [["expenseCategory", "Expense category"], ["expenseSubCategory", "Expense sub category"], ["expenseDate", "Expense date"]];
    if (vehicleSubs.includes(values.expenseSubCategory)) required.push(["vehicleId", "Vehicle"]);
    if (maintenance) required.push(["vendor", "Vendor"], ["spareAmount", "Spare amount"], ["labourAmount", "Labour amount"]);
    else if (withVendor.includes(values.expenseSubCategory)) required.push(["vendor", "Vendor"]);
    if (subCategory === "Tyre") required.push(["count", "Count"]);
    if (subCategory === "Office") required.push(["employeeName", "Employee"], ["month", "Month"]);
    if (subCategory === "Driver") required.push(["driverId", "Driver"], ["vehicleId", "Vehicle"], ["month", "Month"]);
    if (!maintenance) required.push(["amount", "Amount"]);
    const missing = required.find(([field]) => values[field] === null || values[field] === undefined || values[field] === "");
    if (missing) { form.setError(missing[0], { message: `${missing[1]} is required.` }); return; }
    const payload = { ...values, amount: maintenance ? spareAmount + labourAmount : Number(values.amount) };
    const result = expense ? await dispatch(updateExpenseThunk({ id: expense._id, payload })) : await dispatch(createExpenseThunk(payload));
    if (createExpenseThunk.fulfilled.match(result) || updateExpenseThunk.fulfilled.match(result)) { await dispatch(getExpensesThunk({ limit: 100 })); toast.success(expense ? "Expense updated successfully." : "Expense created successfully."); onSuccess(); }
    else toast.error((result.payload as string) || "Unable to save expense.");
  };

  const field = (name: keyof ExpensePayload, label: string, type = "text", disabled = false) => <div className="space-y-2"><Label>{label}</Label><Controller name={name} control={form.control} render={({ field: input, fieldState }) => <><Input type={type} disabled={disabled} value={(input.value ?? "") as string | number} onChange={(event) => input.onChange(type === "number" ? (event.target.value === "" ? null : Number(event.target.value)) : event.target.value)} />{fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}</>} /></div>;
  const select = (name: keyof ExpensePayload, label: string, options: { value: string; label: string }[]) => <div className="space-y-2"><Label>{label}</Label><Controller name={name} control={form.control} render={({ field: input, fieldState }) => <><Select value={(input.value as string) || ""} onValueChange={(value) => { if (name === "expenseCategory") { form.setValue("expenseSubCategory", ""); resetConditionalFields(); } if (name === "expenseSubCategory") resetConditionalFields(); input.onChange(value); }}><SelectTrigger><SelectValue placeholder={`Select ${label}`} /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select>{fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}</>} /></div>;

  return <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"><div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    {select("expenseCategory", "Expense Category *", Object.keys(subCategories).map((value) => ({ value, label: value })))}
    {category && select("expenseSubCategory", "Expense Sub Category *", subCategories[category].map((value) => ({ value, label: value })))}
    {subCategory && vehicleSubs.includes(subCategory) && select("vehicleId", "Vehicle *", vehicles.map((vehicle) => ({ value: vehicle._id, label: vehicle.vehicleNumber })))}
    {subCategory === "Driver" && <>{select("driverId", "Driver *", drivers.map((driver) => ({ value: driver._id, label: driver.name })))}{select("vehicleId", "Vehicle *", vehicles.map((vehicle) => ({ value: vehicle._id, label: vehicle.vehicleNumber })))}</>}
    {subCategory === "Office" && select("employeeName", "Employee *", employees.filter((employee) => employee.isDriver === false).map((employee) => ({ value: employee.name, label: employee.name })))}
    {subCategory === "Tyre" && field("count", "Count *", "number")}
    {withVendor.includes(subCategory) && field("vendor", maintenance || ["RTO", "Fast Tag", "Insurance", "Other Point Expense"].includes(subCategory) ? "Vendor *" : "Vendor")}
    {maintenance && <>{field("spareAmount", "Spare Amount *", "number")}{field("labourAmount", "Labour Amount *", "number")}<div className="space-y-2"><Label>Total Amount</Label><Input type="number" value={spareAmount + labourAmount} disabled /></div></>}
    {subCategory && !maintenance && field("amount", subCategory === "Driver" ? "Salary Amount *" : "Amount *", "number")}
    {subCategory === "Driver" && <>{field("diesel", "Diesel", "number")}{field("dieselAmount", "Diesel Amount", "number")}{field("mileage", "Mileage", "number")}</>}
    {(subCategory === "Office" || subCategory === "Driver") && field("month", "Month *", "month")}
    {subCategory === "Insurance" && field("expiryDate", "Expiry Date", "date")}
    {subCategory && field("expenseDate", "Expense Date *", "date")}
  </div>{subCategory && <div className="space-y-2"><Label>Notes</Label><Controller name="notes" control={form.control} render={({ field: input }) => <Textarea {...input} value={input.value || ""} placeholder="Add notes" />}/></div>}
  <div className="flex justify-end gap-3"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={loading}>{loading ? "Saving..." : expense ? "Update Expense" : "Save Expense"}</Button></div></form>;
};
export default ExpenseForm;
