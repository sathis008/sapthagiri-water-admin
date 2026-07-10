import { useEffect, useMemo, useState } from "react";

import { UserCheck, Wallet, Clock3 } from "lucide-react";

import ReportLayout from "@/components/reports/ReportLayout";
import ReportToolbar from "@/components/reports/ReportToolbar";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";

import ServerDataTable from "@/components/common/ServerDataTable";

import { driverSettlementColumns } from "@/components/reports/driver/DriverSettlementColumns";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDriverSettlementThunk } from "@/redux/report";

import ReportService from "@/services/report.service";
import type { DriverSettlementRow } from "@/types/report";

const DriverSettlement = () => {
  const dispatch = useAppDispatch();

  const { driverSettlement, loading } = useAppSelector((state) => state.report);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

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
   * Fetch Settlement
   */
  const fetchSettlement = () => {
    dispatch(
      getDriverSettlementThunk({
        search: debouncedSearch,
      }),
    );
  };

  useEffect(() => {
    fetchSettlement();
  }, [debouncedSearch]);

  /**
   * Export
   */
  const downloadExcel = async () => {
    await ReportService.downloadDriverSettlementExcel();
  };

  const downloadPDF = async () => {
    await ReportService.downloadDriverSettlementPDF();
  };

  /**
   * Summary
   */
  const summary = useMemo(() => {
    const rows: DriverSettlementRow[] = driverSettlement?.rows ?? [];

    return {
      totalDrivers: rows.length,

      totalCollected: rows.reduce(
        (sum: number, row: DriverSettlementRow) => sum + row.totalCollected,
        0,
      ),

      totalPending: rows.reduce(
        (sum: number, row: DriverSettlementRow) => sum + row.pendingCollection,
        0,
      ),
    };
  }, [driverSettlement]);

  return (
    <ReportLayout
      title="Driver Settlement"
      description="Driver-wise collection and pending settlement report."
      toolbar={
        <ReportToolbar
          search={search}
          onSearchChange={setSearch}
          onRefresh={fetchSettlement}
          onExportExcel={downloadExcel}
          onExportPDF={downloadPDF}
        />
      }
      summary={
        <ReportSummaryCards
          items={[
            {
              title: "Drivers",
              value: summary.totalDrivers,
              icon: <UserCheck size={70} />,
              color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            },
            {
              title: "Collected",
              value: summary.totalCollected,
              prefix: "₹",
              icon: <Wallet size={70} />,
              color: "bg-gradient-to-r from-green-500 to-emerald-600",
            },
            {
              title: "Pending",
              value: summary.totalPending,
              prefix: "₹",
              icon: <Clock3 size={70} />,
              color: "bg-gradient-to-r from-orange-500 to-red-500",
            },
          ]}
        />
      }
    >
      <ServerDataTable
        columns={driverSettlementColumns}
        data={driverSettlement?.rows ?? []}
        loading={loading}
      />
    </ReportLayout>
  );
};

export default DriverSettlement;
