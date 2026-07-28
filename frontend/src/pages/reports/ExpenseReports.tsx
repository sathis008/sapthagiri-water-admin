import { useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/common/DataTable";
import ReportLayout from "@/components/reports/ReportLayout";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getExpenseReportThunk, getSalaryReportThunk, getVehicleExpenseReportThunk } from "@/redux/report";
import { getVehiclesThunk } from "@/redux/vehicle";
import { getDriversThunk, getEmployeesThunk } from "@/redux/driver";
import { isAdmin } from "@/utills/auth";
import type { ExpenseReportRow } from "@/types/report";

type Kind = "expense" | "vehicle" | "salary";
const categories = ["Vehicle Expense", "Office Expense", "Salary Expense"];
const subCategories = ["Vehicle Maintenance", "Vehicle Expense", "RTO", "Fast Tag", "Insurance", "Other Point Expense", "Office Expense", "Tyre", "LIC Expense", "Point Expense", "Bill Book Printing", "Mobile Expense", "Pandurangan", "Office", "Driver"];
const subCategoriesByCategory: Record<string, string[]> = {
  "Vehicle Expense": ["Vehicle Maintenance", "Vehicle Expense", "RTO", "Fast Tag", "Insurance", "Other Point Expense"],
  "Office Expense": ["Office Expense", "Tyre", "LIC Expense", "Point Expense", "Bill Book Printing", "Mobile Expense", "Pandurangan"],
  "Salary Expense": ["Office", "Driver"],
};
const dateOnly = (date: Date) => date.toISOString().slice(0, 10);
const vehicle = (row: ExpenseReportRow) => typeof row.vehicleId === "object" && row.vehicleId ? row.vehicleId.vehicleNumber : "-";
const driver = (row: ExpenseReportRow) => typeof row.driverId === "object" && row.driverId ? row.driverId.name : "-";

const ExpenseReports = ({ kind }: { kind: Kind }) => {
  const dispatch = useAppDispatch();
  const { expenseReport, vehicleExpenseReport, salaryReport, loading } = useAppSelector((state) => state.report);
  const { vehicles } = useAppSelector((state) => state.vehicle);
  const { drivers, employees } = useAppSelector((state) => state.driver);
  const { user } = useAppSelector((state) => state.auth);
  const manager = !isAdmin(user?.role);
  const now = new Date(); const minDate = dateOnly(new Date(now.getFullYear(), now.getMonth(), 1)); const maxDate = dateOnly(now);
  const [filters, setFilters] = useState<Record<string, string>>({ fromDate: "", toDate: "", expenseCategory: "", expenseSubCategory: "", vehicleId: "", driverId: "", vendor: "", salaryType: "", employeeName: "" });
  const report = kind === "expense" ? expenseReport : kind === "vehicle" ? vehicleExpenseReport : salaryReport;
  useEffect(() => { dispatch(getVehiclesThunk({ limit: 1000 })); dispatch(getDriversThunk({ limit: 1000 })); dispatch(getEmployeesThunk({ limit: 1000 })); }, [dispatch]);
  useEffect(() => { const params = { page: 1, limit: 100, ...filters }; if (kind === "expense") dispatch(getExpenseReportThunk(params)); else if (kind === "vehicle") dispatch(getVehicleExpenseReportThunk(params)); else dispatch(getSalaryReportThunk(params)); }, [dispatch, kind, filters]);
  const columns = useMemo<ColumnDef<ExpenseReportRow>[]>(() => {
    const common: ColumnDef<ExpenseReportRow>[] = [
      { id: "vehicle", header: "Vehicle", cell: ({ row }) => vehicle(row.original) },
      { accessorKey: "expenseSubCategory", header: ({ column }) => <DataTableColumnHeader column={column} title={kind === "vehicle" ? "Expense Type" : "Expense Sub Category"} /> },
      { accessorKey: "vendor", header: "Vendor", cell: ({ row }) => row.original.vendor || "-" },
      { accessorKey: "notes", header: "Notes", cell: ({ row }) => row.original.notes || "-" },
      { accessorKey: "amount", header: ({ column }) => <DataTableColumnHeader column={column} title={kind === "salary" ? "Salary Amount" : "Amount"} />, cell: ({ row }) => `₹${Number(row.original.amount || 0).toLocaleString("en-IN")}` },
      { accessorKey: "expenseDate", header: ({ column }) => <DataTableColumnHeader column={column} title="Expense Date" />, cell: ({ row }) => new Date(row.original.expenseDate).toLocaleDateString() },
    ];
    if (kind === "expense") return [{ accessorKey: "expenseCategory", header: "Expense Category" }, { accessorKey: "expenseDate", header: "Expense Date", cell: ({ row }) => new Date(row.original.expenseDate).toLocaleDateString() }, { accessorKey: "expenseSubCategory", header: "Expense Sub Category" }, { id: "vehicle", header: "Vehicle", cell: ({ row }) => vehicle(row.original) }, { id: "driver", header: "Driver", cell: ({ row }) => driver(row.original) }, ...common.slice(2, 5)];
    if (kind === "salary") return [{ id: "employee", header: "Employee Name", cell: ({ row }) => row.original.expenseSubCategory === "Office" ? row.original.employeeName : driver(row.original) }, { id: "employeeType", header: "Employee Type", cell: ({ row }) => row.original.expenseSubCategory === "Office" ? "Office" : "Driver" }, { id: "vehicle", header: "Vehicle", cell: ({ row }) => vehicle(row.original) }, ...common.slice(4, 5), { accessorKey: "dieselAmount", header: "Diesel Amount", cell: ({ row }) => `₹${Number(row.original.dieselAmount || 0).toLocaleString("en-IN")}` }, { accessorKey: "mileage", header: "Mileage", cell: ({ row }) => row.original.mileage || "-" }, common[5]];
    return common;
  }, [kind]);
  const set = (field: string, value: string) => setFilters((current) => field === "expenseCategory" ? { ...current, expenseCategory: value, expenseSubCategory: "" } : { ...current, [field]: value });
  const select = (field: string, label: string, options: { value: string; label: string }[]) => <div className="space-y-1"><Label>{label}</Label><select className="h-10 w-full rounded-md border px-3" value={filters[field]} onChange={(event) => set(field, event.target.value)}><option value="">All</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>;
  const title = kind === "expense" ? "Expense Report" : kind === "vehicle" ? "Vehicle Expense Report" : "Salary Report";
  const summaryTitle = kind === "salary" ? "Total Salary Paid" : kind === "vehicle" ? "Total Vehicle Expense" : "Total Expense";
  const expenseSubCategories = filters.expenseCategory ? subCategoriesByCategory[filters.expenseCategory] || [] : subCategories;
  return <ReportLayout title={title} description={title}><div className="space-y-5 p-4"><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"><div className="space-y-1"><Label>From Date</Label><Input type="date" value={filters.fromDate} min={manager ? minDate : undefined} max={manager ? maxDate : undefined} onChange={(event) => set("fromDate", event.target.value)} /></div><div className="space-y-1"><Label>To Date</Label><Input type="date" value={filters.toDate} min={manager ? minDate : undefined} max={manager ? maxDate : undefined} onChange={(event) => set("toDate", event.target.value)} /></div>{kind === "expense" && <>{select("expenseCategory", "Expense Category", categories.map((value) => ({ value, label: value })))}{select("expenseSubCategory", "Expense Sub Category", expenseSubCategories.map((value) => ({ value, label: value })))}{select("vehicleId", "Vehicle", vehicles.map((item) => ({ value: item._id, label: item.vehicleNumber })))}{select("driverId", "Driver", drivers.map((item) => ({ value: item._id, label: item.name })))}<div className="space-y-1"><Label>Vendor</Label><Input value={filters.vendor} onChange={(event) => set("vendor", event.target.value)} /></div></>}{kind === "vehicle" && <>{select("vehicleId", "Vehicle", vehicles.map((item) => ({ value: item._id, label: item.vehicleNumber })))}{select("expenseSubCategory", "Expense Sub Category", [...subCategories.slice(0, 6), "Diesel"].map((value) => ({ value, label: value })))}</>}{kind === "salary" && <>{select("salaryType", "Salary Type", [{ value: "Office", label: "Office" }, { value: "Driver", label: "Driver" }])}{filters.salaryType === "Office" && select("employeeName", "Employee", employees.filter((item) => item.isDriver === false).map((item) => ({ value: item.name, label: item.name })))}{filters.salaryType === "Driver" && select("driverId", "Driver", drivers.map((item) => ({ value: item._id, label: item.name })))}</>}<Button className="self-end" variant="outline" onClick={() => setFilters({ fromDate: "", toDate: "", expenseCategory: "", expenseSubCategory: "", vehicleId: "", driverId: "", vendor: "", salaryType: "", employeeName: "" })}>Reset</Button></div><ReportSummaryCards items={[{ title: summaryTitle, value: report?.summary?.totalAmount || 0, prefix: "₹", icon: <span />, color: "bg-gradient-to-r from-rose-500 to-orange-500" }, ...(kind === "salary" ? [{ title: "Total Diesel", value: report?.summary?.totalDiesel || 0, prefix: "₹", icon: <span />, color: "bg-gradient-to-r from-amber-500 to-orange-500" }] : []), { title: "Total Records", value: report?.summary?.totalRecords || 0, icon: <span />, color: "bg-gradient-to-r from-blue-500 to-cyan-500" }]} /><DataTable columns={columns} data={report?.rows || []} loading={loading} searchColumn="expenseSubCategory" searchPlaceholder="Search report..." /><div className="text-right font-semibold">Total: ₹{Number(report?.summary?.totalAmount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div></div></ReportLayout>;
};
export const ExpenseReport = () => <ExpenseReports kind="expense" />;
export const VehicleExpenseReport = () => <ExpenseReports kind="vehicle" />;
export const SalaryReport = () => <ExpenseReports kind="salary" />;
