import {Navigate, Outlet} from "react-router-dom";

/**
 *1
 */
interface ProtectedRouterProps {

  /**
   *1
   */
  isAuth: boolean;
}

/**
 *1
 */
export const ProtectedRouter = (props: ProtectedRouterProps) => {
  if (props.isAuth) {

    return <Outlet />;
  }

  return (<Navigate
    to='/'
    replace
  />);
};