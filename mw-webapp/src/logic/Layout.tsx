import {Outlet} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {FirebaseAnalytics} from "src/FirebaseAnalytics";
import {useGlobalContext} from "src/GlobalContext";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";

/**
 * Layout
 */
export const Layout = () => {
  const {user} = useGlobalContext();

  return (
    <InitializedApp>
      <Header user={user} />
      <Outlet />
      <FirebaseAnalytics />
    </InitializedApp>
  );
};
