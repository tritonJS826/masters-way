import {Navigate, Outlet, useLocation} from "react-router-dom";
import {auth} from "src/firebase";

/**
 * Protected Router
 */
export const ProtectedRouter = () => {
  const location = useLocation();
  const isAuth = auth.currentUser;
  if (isAuth) {
    return <Outlet />;
  }

  return (<Navigate
    to='/'
    state={{from: location}}
    replace
  />);
};