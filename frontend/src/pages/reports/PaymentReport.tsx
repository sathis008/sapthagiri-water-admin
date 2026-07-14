import { useEffect, useState } from "react";

import { Receipt, Wallet, Building2 } from "lucide-react";

import ReportLayout from "@/components/reports/ReportLayout";
import ReportToolbar from "@/components/reports/ReportToolbar";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";

import ServerDataTable from "@/components/common/ServerDataTable";
import ServerPagination from "@/components/common/ServerPagination";

import { paymentReportColumns } from "@/components/reports/payment/PaymentReportColumns";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPaymentReportThunk } from "@/redux/report";

import ReportService from "@/services/report.service";

const PaymentReport = () => {
  const dispatch = useAppDispatch();

  const { paymentReport, loading } = useAppSelector((state) => state.report);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    customerId: "",
    driverId: "",
    paymentMode: "",
    collectedBy: "",
  });

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
      getPaymentReportThunk({
        page,
        limit: 10,
        search: debouncedSearch,
        ...filters,
      }),
    );
  };

  useEffect(() => {
    fetchReport();
  }, [page, debouncedSearch, filters]);

  /**
   * Export
   */
  const downloadExcel = async () => {
    await ReportService.downloadPaymentExcel({
      search: debouncedSearch,
      ...filters,
    });
  };

  const downloadPDF = async () => {
    await ReportService.downloadPaymentPDF({
      search: debouncedSearch,
      ...filters,
    });
  };

  /**
   * Reset Filters
   */
  const resetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      customerId: "",
      driverId: "",
      paymentMode: "",
      collectedBy: "",
    });

    setSearch("");

    setPage(1);
  };

  return (
    <ReportLayout
      title="Payment Report"
      description="View customer payments with advanced filters."
      toolbar={
        <ReportToolbar
          search={search}
          onSearchChange={setSearch}
          onRefresh={fetchReport}
          onExportExcel={downloadExcel}
          onExportPDF={downloadPDF}
          filters={
            <ReportFilters
              {...filters}
              showCustomer
              showDriver
              showPaymentMode
              showCollectedBy
              customers={[]}
              drivers={[]}
              onChange={(field, value) =>
                setFilters((prev) => ({
                  ...prev,
                  [field]: value,
                }))
              }
              onReset={resetFilters}
            />
          }
        />
      }
      summary={
        paymentReport?.summary && (
          <ReportSummaryCards
            items={[
              {
                title: "Payments",
                value: paymentReport.summary.totalPayments,
                icon: <Receipt size={70} />,
                color: "bg-gradient-to-r from-blue-500 to-cyan-500",
              },
              {
                title: "Cash",
                value: paymentReport.summary.cashAmount,
                prefix: "₹",
                icon: <Wallet size={70} />,
                color: "bg-gradient-to-r from-green-500 to-emerald-600",
              },
              // {
              //   title: "UPI",
              //   value: paymentReport.summary.upiAmount,
              //   prefix: "₹",
              //   icon: <Smartphone size={70} />,
              //   color: "bg-gradient-to-r from-violet-500 to-purple-600",
              // },
              {
                title: "Bank",
                value: paymentReport.summary.bankAmount,
                prefix: "₹",
                icon: <Building2 size={70} />,
                color: "bg-gradient-to-r from-orange-500 to-red-500",
              },
            ]}
          />
        )
      }
    >
      <ServerDataTable
        columns={paymentReportColumns}
        data={paymentReport?.rows ?? []}
        loading={loading}
      />

      <ServerPagination
        page={paymentReport?.pagination?.page ?? 1}
        totalPages={paymentReport?.pagination?.totalPages ?? 1}
        total={paymentReport?.pagination?.total ?? 0}
        limit={paymentReport?.pagination?.limit ?? 10}
        onPageChange={setPage}
      />
    </ReportLayout>
  );
};

export default PaymentReport;
