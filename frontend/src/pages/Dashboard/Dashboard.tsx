import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDashboardThunk } from "@/redux/dashboard";
import { isAdmin } from "@/utills/auth";

import DashboardCards from "@/components/dashboard/DashboardCards";
import BookingTrendChart from "@/components/dashboard/BookingTrendChart";
import BookingStatusChart from "@/components/dashboard/BookingStatusChart";
import PaymentModeChart from "@/components/dashboard/PaymentModeChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import RecentPayments from "@/components/dashboard/RecentPayments";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TopPerformance from "@/components/dashboard/TopPerformance";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.dashboard);
  const { user } = useAppSelector((state) => state.auth);

  const adminView = isAdmin(user?.role);

  useEffect(() => {
    dispatch(getDashboardThunk());
  }, [dispatch]);

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-5">
      <DashboardHeader onRefresh={() => dispatch(getDashboardThunk())} />

      {data && (
        <>
          {/* Summary Cards — filtered by role */}
          <DashboardCards summary={data.summary} role={user?.role} />

          {/* Booking Trend Chart & Top Performance — visible to all */}
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <BookingTrendChart data={data.bookingTrend} />
            </div>

            <TopPerformance
              customer={data.topCustomer}
              driver={data.topDriver}
              vehicle={data.topVehicle}
            />
          </div>

          {/* Booking Status — visible to all */}
          <div className="grid gap-4 lg:grid-cols-2">
            <BookingStatusChart data={data.bookingStatus} />

            {/* Payment Mode Chart — Admin only */}
            {adminView && <PaymentModeChart data={data.paymentMode} />}
          </div>

          {/* Recent Bookings — visible to all */}
          <div className="grid gap-4 xl:grid-cols-2">
            <RecentBookings bookings={data.recentBookings} />

            {/* Recent Payments — Admin only */}
            {adminView && <RecentPayments payments={data.recentPayments} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
