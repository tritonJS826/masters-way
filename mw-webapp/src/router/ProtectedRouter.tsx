import {Navigate, Outlet, useLocation} from "react-router-dom";
import {pages} from "src/router/pages";
import {PATH, USER_IS_AUTH} from "src/service/auth/keysStorage";

/**
 * Protected Router
 */
export const ProtectedRouterLayer = () => {
  const location = useLocation();
  const authStatus = localStorage.getItem(USER_IS_AUTH) ?? "";
  const isAuth = JSON.parse(authStatus);
  if (isAuth) {
    return <Outlet />;
  }

  sessionStorage.setItem(PATH, location.pathname);

  return <Navigate to={pages.redirect.path} />;
};