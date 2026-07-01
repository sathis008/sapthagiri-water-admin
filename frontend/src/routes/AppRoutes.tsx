import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { APP_ROUTES } from "@/constants/routes";
import CustomerList from "@/pages/Customer/CustomerList";

const AppRoutes = () => {
  return (
   <Routes>

  {/* Public */}

  <Route element={<PublicRoute />}>

    <Route
      path={APP_ROUTES.LOGIN}
      element={<Login />}
    />

  </Route>

  {/* Protected */}

  <Route element={<ProtectedRoute />}>

    <Route element={<DashboardLayout />}>

      <Route
        path={APP_ROUTES.DASHBOARD}
        element={<Dashboard />}
      />
      <Route
          path={APP_ROUTES.CUSTOMERS}
          element={<CustomerList />}
      />
    </Route>

  </Route>

  <Route
    path="*"
    element={
      <Navigate
        to={APP_ROUTES.LOGIN}
        replace
      />
    }
  />

</Routes>
  );
};

export default AppRoutes;