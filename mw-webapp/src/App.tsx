import {Header} from "src/component/header/Header";
import {useErrorNotification} from "src/hooks/useErrorNotification";
import {Router} from "src/router/Router";

/**
 * App
 */
export const App = () => {
  const {ErrorNotification, triggerErrorNotification} = useErrorNotification();

  triggerErrorNotification("test error");

  return (
    <>
      {ErrorNotification}
      <Header />
      <Router />
    </>
  );
};
