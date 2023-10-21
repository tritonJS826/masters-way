import {Navigate, Outlet, useLocation} from "react-router-dom";

/**
 * Protected Router
 */
export const ProtectedRouter = () => {
  const location = useLocation();
  const history = localStorage.getItem("auth") ?? "";
  const is = JSON.parse(history);

  if (is === true) {
    return <Outlet />;
  }

  return (<Navigate
    to='/'
    state={{from: location}}
    replace
  />);
};