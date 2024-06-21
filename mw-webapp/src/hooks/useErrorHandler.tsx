import {useEffect} from "react";
import {displayNotification} from "src/component/notification/Notification";
import {GlobalErrorAction, trackGlobalErrors} from "src/GoogleAnalytics";

/**
 * Handles global unhandled errors and promise rejections, displays notification with error message
 */
export const useErrorHandler = () => {

  /**
   * Handle global error and display notification
   */
  const handleError = (event: ErrorEvent) => {
    displayNotification({text: `Error: ${event.message}`, type: "error"});
    trackGlobalErrors({
      action: GlobalErrorAction.ERROR,
      label: event.message,
    });
  };

  /**
   * Handle unhandled promise rejection and display notification
   */
  const handlePromiseRejection = (event: PromiseRejectionEvent) => {
    displayNotification({text: `Ups, ${event.reason}`, type: "error"});
    trackGlobalErrors({
      action: GlobalErrorAction.PROMISE_REJECTION,
      label: event.reason,
    });
  };

  useEffect(() => {
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);
};

