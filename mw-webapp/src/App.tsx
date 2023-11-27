import {Header} from "src/component/header/Header";
import {Notification, NotificationType} from "src/component/notification/Notification";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {Router} from "src/router/Router";

/**
 * App
 */
export const App = () => {
  const errorMessage = useErrorHandler();

  return (
    <>
      {errorMessage &&
        <Notification
          content={<div>
            {errorMessage}
          </div>}
          type={NotificationType.foreground}
        />
      }
      <Header />
      <Router />
    </>
  );
};
