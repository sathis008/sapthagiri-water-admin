import { useEffect, useMemo, useState } from "react";
import { Package, DollarSign, Droplet } from "lucide-react";

import ReportLayout from "@/components/reports/ReportLayout";
import ReportToolbar from "@/components/reports/ReportToolbar";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportSummaryCards from "@/components/reports/ReportSummaryCards";

import ServerDataTable from "@/components/common/ServerDataTable";
import ServerPagination from "@/components/common/ServerPagination";

import { bookingReportColumns } from "@/components/reports/booking/BookingReportColumns";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { getBookingReportThunk } from "@/redux/report";

import { getCustomersThunk } from "@/redux/customer";
import { getDriversThunk } from "@/redux/driver";
import { getVehiclesThunk } from "@/redux/vehicle";

import ReportColumnSelector from "@/components/reports/ReportColumnSelector";
import { bookingColumns } from "@/components/reports/config/bookingColumns";

import ReportService from "@/services/report.service";
import { useReportColumns } from "@/hooks/useReportColumns";
import { isAdmin } from "@/utills/auth";

const BookingReport = () => {
  const dispatch = useAppDispatch();

  const { bookingReport, loading } = useAppSelector((state) => state.report);

  const { customers } = useAppSelector((state) => state.customer);

  const { drivers } = useAppSelector((state) => state.driver);

  const { vehicles } = useAppSelector((state) => state.vehicle);

  const { user } = useAppSelector((state) => state.auth);
  const adminView = isAdmin(user?.role);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

  const { visibleColumns, setVisibleColumns, resetColumns } = useReportColumns(
    "booking-report",
    [
      "bookingNumber",
      "bookingDate",
      "customerName",
      "driverName",
      "vehicleNumber",
      "capacity",
      "price",
      "status",
      "paymentStatus",
    ],
  );

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    customerId: "",
    driverId: "",
    vehicleId: "",
    status: "",
    paymentStatus: "",
  });

  /**
   * Load Masters Only Once
   */
  useEffect(() => {
    if (!customers.length) {
      dispatch(
        getCustomersThunk({
          page: 1,
          limit: 1000,
        }),
      );
    }

    if (!drivers.length) {
      dispatch(
        getDriversThunk({
          page: 1,
          limit: 1000,
        }),
      );
    }

    if (!vehicles.length) {
      dispatch(
        getVehiclesThunk({
          page: 1,
          limit: 1000,
        }),
      );
    }
  }, []);

  /**
   * Dropdown Options
   */
  const customerOptions = useMemo(
    () =>
      customers.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [customers],
  );

  const driverOptions = useMemo(
    () =>
      drivers.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [drivers],
  );

  const vehicleOptions = useMemo(
    () =>
      vehicles.map((item) => ({
        label: item.vehicleNumber,
        value: item._id,
      })),
    [vehicles],
  );

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
      getBookingReportThunk({
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
    await ReportService.downloadBookingExcel({
      page,
      limit: 10,

      search: debouncedSearch,

      ...filters,

      columns: visibleColumns,
    });
  };

  const downloadPDF = async () => {
    await ReportService.downloadBookingPDF({
      page,
      limit: 10,

      search: debouncedSearch,

      ...filters,

      columns: visibleColumns,
    });
  };

  // /**
  //  * Reset
  //  */
  // const resetFilters = () => {
  //   setFilters({
  //     fromDate: "",
  //     toDate: "",
  //     customerId: "",
  //     driverId: "",
  //     vehicleId: "",
  //     status: "",
  //     paymentStatus: "",
  //   });

  //   setSearch("");

  //   setPage(1);
  // };

  return (
    <ReportLayout
      title="Booking Report"
      description="View booking history with advanced filters."
      toolbar={
        <ReportToolbar
          search={search}
          onSearchChange={setSearch}
          onRefresh={fetchReport}
          onExportExcel={downloadExcel}
          onExportPDF={downloadPDF}
          columnSelector={
            <ReportColumnSelector
              storageKey="booking-report-columns"
              columns={bookingColumns}
              onApply={setVisibleColumns}
            />
          }
          filters={
            <ReportFilters
              {...filters}
              showCustomer
              showDriver
              showVehicle
              showStatus
              showPaymentStatus
              customers={customerOptions}
              drivers={driverOptions}
              vehicles={vehicleOptions}
              onChange={(field, value) =>
                setFilters((prev) => ({
                  ...prev,
                  [field]: value,
                }))
              }
              onReset={resetColumns}
            />
          }
        />
      }
      summary={
        bookingReport?.summary && (
          <ReportSummaryCards
            items={[
              {
                title: "Bookings",
                value: bookingReport.summary.totalBookings,
                color: "bg-gradient-to-r from-blue-500 to-cyan-500",
                icon: <Package size={60} />,
              },
              {
                title: "Capacity",
                value: bookingReport.summary.totalCapacity,
                color: "bg-gradient-to-r from-purple-500 to-indigo-500",
                icon: <Droplet size={60} />,
              },
              // Revenue card hidden for Manager
              ...(adminView
                ? [
                    {
                      title: "Revenue",
                      value: bookingReport.summary.totalAmount,
                      prefix: "₹",
                      color: "bg-gradient-to-r from-green-500 to-emerald-500",
                      icon: <DollarSign size={60} />,
                    },
                  ]
                : []),
            ]}
          />
        )
      }
    >
      <ServerDataTable
        columns={bookingReportColumns(visibleColumns)}
        data={bookingReport?.rows ?? []}
        loading={loading}
      />

      <ServerPagination
        page={bookingReport?.pagination?.page ?? 1}
        totalPages={bookingReport?.pagination?.totalPages ?? 1}
        total={bookingReport?.pagination?.total ?? 0}
        limit={bookingReport?.pagination?.limit ?? 10}
        onPageChange={setPage}
      />
    </ReportLayout>
  );
};

export default BookingReport;
