import {useEffect} from "react";
import {trackGlobalError, trackPromiseRejection} from "src/analytics/globalErrorAnalytics";
import {displayNotification} from "src/component/notification/Notification";

/**
 * Handles global unhandled errors and promise rejections, displays notification with error message
 */
export const useErrorHandler = () => {

  /**
   * Handle global error and display notification
   */
  const handleError = (event: ErrorEvent) => {
    displayNotification({text: `Error: ${event.message}`, type: "error"});
    trackGlobalError(event.message);
  };

  /**
   * Handle unhandled promise rejection and display notification
   */
  const handlePromiseRejection = (event: PromiseRejectionEvent) => {
    displayNotification({text: `Ups, ${event.reason}`, type: "error"});
    trackPromiseRejection(event.reason);
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

