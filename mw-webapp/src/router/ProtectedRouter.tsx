import {Navigate, Outlet} from "react-router-dom";

/**
 *Protected Router props
 */
interface ProtectedRouterProps {

  /**
   * Autorization users
   */
  isAuth: boolean;
}

/**
 * Protected Router
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