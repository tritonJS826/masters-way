import {Header} from "src/component/header/Header";
import {Notification, NotificationType} from "src/component/notification/Notification";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {Router} from "src/router/Router";

/**
 * App
 */
export const App = () => {
  const error = useErrorHandler();

  return (
    <>
      {error &&
        <Notification
          content={<div>
            {error}
          </div>}
          duration={5000}
          type={NotificationType.foreground}
        />
      }
      <Header />
      <Router />
    </>
  );
};
