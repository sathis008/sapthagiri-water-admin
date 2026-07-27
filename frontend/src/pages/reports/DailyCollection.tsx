import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Wallet, Building2, Smartphone } from "lucide-react";

import ReportLayout from "@/components/reports/ReportLayout";
import ReportToolbar from "@/components/reports/ReportToolbar";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";
import ServerDataTable from "@/components/common/ServerDataTable";

import { dailyCollectionColumns } from "@/components/reports/daily/DailyCollectionColumns";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDailyCollectionThunk } from "@/redux/report";
import { getCustomersThunk } from "@/redux/customer";
import { getDriversThunk } from "@/redux/driver";
import { getVehiclesThunk } from "@/redux/vehicle";

import ReportService from "@/services/report.service";
import type { DailyCollectionRow } from "@/types/report";
import { isAdmin } from "@/utills/auth";

/** Returns today's date as YYYY-MM-DD */
const todayStr = () => new Date().toISOString().slice(0, 10);

const DailyCollection = () => {
  const dispatch = useAppDispatch();

  const { dailyCollection, loading } = useAppSelector((state) => state.report);
  const { customers } = useAppSelector((state) => state.customer);
  const { drivers } = useAppSelector((state) => state.driver);
  const { vehicles } = useAppSelector((state) => state.vehicle);
  const { user } = useAppSelector((state) => state.auth);

  const adminView = isAdmin(user?.role);

  // Default: today for both From and To
  const [fromDate, setFromDate] = useState(todayStr);
  const [toDate, setToDate] = useState(todayStr);

  const [filters, setFilters] = useState({
    customerId: "",
    driverId: "",
    vehicleId: "",
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Load master data once
  useEffect(() => {
    if (!customers.length)
      dispatch(getCustomersThunk({ page: 1, limit: 1000 }));
    if (!drivers.length) dispatch(getDriversThunk({ page: 1, limit: 1000 }));
    if (!vehicles.length) dispatch(getVehiclesThunk({ page: 1, limit: 1000 }));
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  // Dropdown options
  const customerOptions = useMemo(
    () => customers.map((c) => ({ label: c.name, value: c._id })),
    [customers],
  );
  const driverOptions = useMemo(
    () => drivers.map((d) => ({ label: d.name, value: d._id })),
    [drivers],
  );
  const vehicleOptions = useMemo(
    () => vehicles.map((v) => ({ label: v.vehicleNumber, value: v._id })),
    [vehicles],
  );

  // Fetch
  const fetchReport = () => {
    dispatch(
      getDailyCollectionThunk({
        search: debouncedSearch,
        fromDate,
        toDate,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    fetchReport();
  }, [debouncedSearch, fromDate, toDate, filters]);

  // Exports
  const downloadExcel = () =>
    ReportService.downloadDailyCollectionExcel({
      search: debouncedSearch,
      fromDate,
      toDate,
      ...filters,
    });

  const downloadPDF = () =>
    ReportService.downloadDailyCollectionPDF({
      search: debouncedSearch,
      fromDate,
      toDate,
      ...filters,
    });

  // Reset
  const handleReset = () => {
    setFromDate(todayStr());
    setToDate(todayStr());
    setFilters({ customerId: "", driverId: "", vehicleId: "" });
    setSearch("");
  };

  // Summary totals
  const summary = useMemo(() => {
    const rows: DailyCollectionRow[] = dailyCollection?.rows ?? [];
    return {
      totalDays: rows.length,
      cash: rows.reduce((s, r) => s + r.cash, 0),
      upi: rows.reduce((s, r) => s + r.upi, 0),
      bank: rows.reduce((s, r) => s + r.bank, 0),
      total: rows.reduce((s, r) => s + r.total, 0),
    };
  }, [dailyCollection]);

  return (
    <ReportLayout
      title="Daily Collection"
      description="Daily payment collection summary."
      toolbar={
        <div className="space-y-4">
          <ReportToolbar
            search={search}
            onSearchChange={setSearch}
            onRefresh={fetchReport}
            onExportExcel={downloadExcel}
            onExportPDF={downloadPDF}
          />

          {/* Filter row */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {/* Date inputs — shown to all but editable only for Admin */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                From Date
              </label>
              <input
                type="date"
                className={`h-10 rounded-md border px-3 text-sm ${
                  !adminView
                    ? "cursor-not-allowed bg-slate-50 text-slate-400"
                    : ""
                }`}
                value={fromDate}
                readOnly={!adminView}
                disabled={!adminView}
                onChange={(e) => adminView && setFromDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                To Date
              </label>
              <input
                type="date"
                className={`h-10 rounded-md border px-3 text-sm ${
                  !adminView
                    ? "cursor-not-allowed bg-slate-50 text-slate-400"
                    : ""
                }`}
                value={toDate}
                readOnly={!adminView}
                disabled={!adminView}
                onChange={(e) => adminView && setToDate(e.target.value)}
              />
            </div>

            {/* Customer filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                Customer
              </label>
              <select
                className="h-10 rounded-md border px-3 text-sm"
                value={filters.customerId}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    customerId: e.target.value,
                  }))
                }
              >
                <option value="">All Customers</option>
                {customerOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Driver filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                Driver
              </label>
              <select
                className="h-10 rounded-md border px-3 text-sm"
                value={filters.driverId}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, driverId: e.target.value }))
                }
              >
                <option value="">All Drivers</option>
                {driverOptions.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500">
                Vehicle
              </label>
              <select
                className="h-10 rounded-md border px-3 text-sm"
                value={filters.vehicleId}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, vehicleId: e.target.value }))
                }
              >
                <option value="">All Vehicles</option>
                {vehicleOptions.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              Reset Filters
            </button>
            {!adminView && (
              <p className="text-xs text-slate-400">
                Date range is fixed to today. Contact Admin to change date
                filters.
              </p>
            )}
          </div>
        </div>
      }
      summary={
        <ReportSummaryCards
          items={[
            {
              title: "Days",
              value: summary.totalDays,
              icon: <CalendarDays size={70} />,
              color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            },
            {
              title: "Cash",
              value: summary.cash,
              prefix: "₹",
              icon: <Wallet size={70} />,
              color: "bg-gradient-to-r from-green-500 to-emerald-600",
            },
            {
              title: "UPI",
              value: summary.upi,
              prefix: "₹",
              icon: <Smartphone size={70} />,
              color: "bg-gradient-to-r from-violet-500 to-purple-600",
            },
            {
              title: "Bank",
              value: summary.bank,
              prefix: "₹",
              icon: <Building2 size={70} />,
              color: "bg-gradient-to-r from-orange-500 to-red-500",
            },
          ]}
        />
      }
    >
      <ServerDataTable
        columns={dailyCollectionColumns}
        data={dailyCollection?.rows ?? []}
        loading={loading}
      />
    </ReportLayout>
  );
};

export default DailyCollection;
