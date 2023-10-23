import {Navigate, Outlet, useLocation} from "react-router-dom";
import {pages} from "src/router/pages";

/**
 * Protected Router
 */
export const ProtectedRouter = () => {
  const location = useLocation();
  const flagAuth = localStorage.getItem("auth") ?? "";
  const isAuth = JSON.parse(flagAuth);
  if (isAuth) {
    return <Outlet />;
  }

  sessionStorage.setItem("path", location.pathname);

  return <Navigate to={pages.redirect.path} />;
};