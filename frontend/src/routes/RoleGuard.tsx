import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";
import { hasRole } from "@/utills/auth";
import { APP_ROUTES } from "@/constants/routes";
import type { UserRole } from "@/types/auth";

interface RoleGuardProps {
  /** Roles that are allowed to access the wrapped routes */
  allowedRoles: UserRole[];
  /** Where to redirect when access is denied. Defaults to /dashboard */
  redirectTo?: string;
}

/**
 * Wrap any <Route> with this component to restrict access by role.
 *
 * Usage in AppRoutes.tsx:
 *   <Route element={<RoleGuard allowedRoles={["ADMIN"]} />}>
 *     <Route path="/payments" element={<PaymentList />} />
 *   </Route>
 */
const RoleGuard = ({
  allowedRoles,
  redirectTo = APP_ROUTES.DASHBOARD,
}: RoleGuardProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!hasRole(user?.role, allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
