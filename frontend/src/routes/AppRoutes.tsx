import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "./RoleGuard";
import { APP_ROUTES } from "@/constants/routes";

import CustomerList from "@/pages/Customer/CustomerList";
import VehicleList from "@/pages/vehicle/VehicleList";
import DriverList from "@/pages/driver/DriverList";
import BookingList from "@/pages/booking/BookingList";
import PaymentList from "@/pages/Payment/PaymentList";
import BookingReport from "@/pages/reports/BookingReport";
import CustomerLedger from "@/pages/reports/CustomerLedger";
import DailyCollection from "@/pages/reports/DailyCollection";
import DriverSettlement from "@/pages/reports/DriverSettlement";
import PaymentReport from "@/pages/reports/PaymentReport";
import ExpenseList from "@/pages/expense/ExpenseList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public ─────────────────────────────────────────────────── */}
      <Route element={<PublicRoute />}>
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
      </Route>

      {/* ── Protected (any authenticated user) ─────────────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Both Admin and Manager */}
          <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={APP_ROUTES.CUSTOMERS} element={<CustomerList />} />
          <Route path={APP_ROUTES.VEHICLES} element={<VehicleList />} />
          <Route path={APP_ROUTES.DRIVERS} element={<DriverList />} />
          <Route path={APP_ROUTES.BOOKINGS} element={<BookingList />} />
          <Route path={APP_ROUTES.PAYMENTS} element={<PaymentList />} />
          <Route path={APP_ROUTES.EXPENSES} element={<ExpenseList />} />

          {/* Reports — both roles, financial cards filtered per role in each page */}
          <Route path="/reports/bookings" element={<BookingReport />} />
          <Route path="/reports/customer-ledger" element={<CustomerLedger />} />
          <Route
            path="/reports/driver-settlement"
            element={<DriverSettlement />}
          />
          <Route
            path="/reports/daily-collection"
            element={<DailyCollection />}
          />

          {/* Payment Report — Admin only (full financial data) */}
          <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
            <Route path="/reports/payments" element={<PaymentReport />} />
          </Route>
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={APP_ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRoutes;
