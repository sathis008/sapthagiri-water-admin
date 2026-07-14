import { useEffect, useMemo, useState } from "react";

import { CalendarDays, Wallet, Building2 } from "lucide-react";

import ReportLayout from "@/components/reports/ReportLayout";
import ReportToolbar from "@/components/reports/ReportToolbar";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";

import ServerDataTable from "@/components/common/ServerDataTable";

import { dailyCollectionColumns } from "@/components/reports/daily/DailyCollectionColumns";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDailyCollectionThunk } from "@/redux/report";

import ReportService from "@/services/report.service";
import type { DailyCollectionRow } from "@/types/report";

const DailyCollection = () => {
  const dispatch = useAppDispatch();

  const { dailyCollection, loading } = useAppSelector((state) => state.report);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  /**
   * Debounce Search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /**
   * Fetch Report
   */
  const fetchReport = () => {
    dispatch(
      getDailyCollectionThunk({
        search: debouncedSearch,
        fromDate,
        toDate,
      }),
    );
  };

  useEffect(() => {
    fetchReport();
  }, [debouncedSearch, fromDate, toDate]);

  /**
   * Export
   */
  const downloadExcel = async () => {
    await ReportService.downloadDailyCollectionExcel({
      search: debouncedSearch,
      fromDate,
      toDate,
    });
  };

  const downloadPDF = async () => {
    await ReportService.downloadDailyCollectionPDF({
      search: debouncedSearch,
      fromDate,
      toDate,
    });
  };

  /**
   * Summary
   */
  const summary = useMemo(() => {
    const rows: DailyCollectionRow[] = dailyCollection?.rows ?? [];

    return {
      totalDays: rows.length,

      cash: rows.reduce(
        (sum: number, row: DailyCollectionRow) => sum + row.cash,
        0,
      ),

      upi: rows.reduce(
        (sum: number, row: DailyCollectionRow) => sum + row.upi,
        0,
      ),

      bank: rows.reduce(
        (sum: number, row: DailyCollectionRow) => sum + row.bank,
        0,
      ),

      total: rows.reduce(
        (sum: number, row: DailyCollectionRow) => sum + row.total,
        0,
      ),
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

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="date"
              className="rounded-md border p-2"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              type="date"
              className="rounded-md border p-2"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
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
            // {
            //   title: "UPI",
            //   value: summary.upi,
            //   prefix: "₹",
            //   icon: <Smartphone size={70} />,
            //   color: "bg-gradient-to-r from-violet-500 to-purple-600",
            // },
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
