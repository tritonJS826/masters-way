import {Outlet} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {FirebaseAnalytics} from "src/FirebaseAnalytics";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";

/**
 * Layout
 */
export const Layout = () => {
  return (
    <InitializedApp>
      <Header />
      <Outlet />
      <FirebaseAnalytics />
    </InitializedApp>
  );
};
