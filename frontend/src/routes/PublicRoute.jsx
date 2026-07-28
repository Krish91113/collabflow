import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PublicRoute() {
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
