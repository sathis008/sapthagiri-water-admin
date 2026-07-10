import { useEffect, useMemo, useState } from "react";

import { Wallet, Receipt, AlertCircle } from "lucide-react";

import ReportLayout from "@/components/reports/ReportLayout";
import ReportToolbar from "@/components/reports/ReportToolbar";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";
import ReportFilters from "@/components/reports/ReportFilters";

import ServerDataTable from "@/components/common/ServerDataTable";

import { customerLedgerColumns } from "@/components/reports/ledger/CustomerLedgerColumns";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { getCustomerLedgerThunk } from "@/redux/report";
import { getCustomersThunk } from "@/redux/customer";

import ReportService from "@/services/report.service";

const CustomerLedger = () => {
  const dispatch = useAppDispatch();

  //------------------------------------------
  // Redux
  //------------------------------------------

  const { customerLedger, loading } = useAppSelector((state) => state.report);

  const { customers } = useAppSelector((state) => state.customer);

  //------------------------------------------
  // State
  //------------------------------------------

  const [customerId, setCustomerId] = useState("");

  //------------------------------------------
  // Load Customers
  //------------------------------------------

  useEffect(() => {
    if (!customers.length) {
      dispatch(getCustomersThunk());
    }
  }, [customers.length, dispatch]);

  //------------------------------------------
  // Customer Dropdown Options
  //------------------------------------------

  const customerOptions = useMemo(
    () =>
      customers.map((customer) => ({
        label: customer.name,
        value: customer._id,
      })),
    [customers],
  );

  //------------------------------------------
  // Fetch Ledger
  //------------------------------------------

  const fetchLedger = () => {
    if (!customerId) return;

    dispatch(
      getCustomerLedgerThunk({
        customerId,
      }),
    );
  };

  useEffect(() => {
    if (customerId) {
      fetchLedger();
    }
  }, [customerId]);

  //------------------------------------------
  // Export Excel
  //------------------------------------------

  const exportExcel = async () => {
    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    await ReportService.downloadCustomerLedgerExcel(customerId);
  };

  //------------------------------------------
  // Export PDF
  //------------------------------------------

  const exportPDF = async () => {
    if (!customerId) {
      alert("Please select a customer.");
      return;
    }

    await ReportService.downloadCustomerLedgerPDF(customerId);
  };

  return (
    <ReportLayout
      title="Customer Ledger"
      description="View complete customer account statement."
      toolbar={
        <ReportToolbar
          showSearch={false}
          search=""
          onSearchChange={() => {}}
          onRefresh={fetchLedger}
          onExportExcel={exportExcel}
          onExportPDF={exportPDF}
          filters={
            <ReportFilters
              customerId={customerId}
              customers={customerOptions}
              showCustomer
              onChange={(field, value) => {
                if (field === "customerId") {
                  setCustomerId(value);
                }
              }}
              onReset={() => {
                setCustomerId("");
              }}
            />
          }
        />
      }
      summary={
        customerLedger?.summary && (
          <ReportSummaryCards
            items={[
              {
                title: "Total Bookings",
                value: customerLedger.summary.totalBookings,
                icon: <Receipt size={65} />,
                color: "bg-gradient-to-r from-blue-500 to-cyan-500",
              },
              {
                title: "Booked Amount",
                value: customerLedger.summary.totalBookedAmount,
                prefix: "₹",
                icon: <Wallet size={65} />,
                color: "bg-gradient-to-r from-green-500 to-emerald-500",
              },
              {
                title: "Outstanding",
                value: customerLedger.summary.outstanding,
                prefix: "₹",
                icon: <AlertCircle size={65} />,
                color: "bg-gradient-to-r from-red-500 to-orange-500",
              },
            ]}
          />
        )
      }
    >
      {!customerId ? (
        <div className="rounded-lg border border-dashed py-20 text-center">
          <Receipt className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h3 className="text-lg font-semibold">Select a Customer</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Please select a customer from the filter above to view the ledger
            report.
          </p>
        </div>
      ) : (
        <>
          <ServerDataTable
            columns={customerLedgerColumns}
            data={customerLedger?.rows ?? []}
            loading={loading}
          />

          {!loading && customerLedger && customerLedger.rows.length === 0 && (
            <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
              No ledger transactions found for this customer.
            </div>
          )}
        </>
      )}
    </ReportLayout>
  );
};

export default CustomerLedger;
