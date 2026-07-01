import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";

import { APP_ROUTES } from "@/constants/routes";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return (
      <Navigate
        to={APP_ROUTES.LOGIN}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;