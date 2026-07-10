import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}

      <Route element={<PublicRoute />}>
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
      </Route>

      {/* Protected */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />

          <Route path={APP_ROUTES.CUSTOMERS} element={<CustomerList />} />

          <Route path={APP_ROUTES.VEHICLES} element={<VehicleList />} />

          <Route path={APP_ROUTES.DRIVERS} element={<DriverList />} />

          <Route path={APP_ROUTES.BOOKINGS} element={<BookingList />} />

          <Route path={APP_ROUTES.PAYMENTS} element={<PaymentList />} />

          {/* Reports */}

          <Route path="/reports/bookings" element={<BookingReport />} />

          <Route path="/reports/payments" element={<PaymentReport />} />

          <Route path="/reports/customer-ledger" element={<CustomerLedger />} />

          <Route
            path="/reports/driver-settlement"
            element={<DriverSettlement />}
          />

          <Route
            path="/reports/daily-collection"
            element={<DailyCollection />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={APP_ROUTES.LOGIN} replace />} />
    </Routes>
  );
};

export default AppRoutes;
