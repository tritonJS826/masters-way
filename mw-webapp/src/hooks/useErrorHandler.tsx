import {useEffect} from "react";
import {displayNotification} from "src/component/notification/Notification";

/**
 * Handles global unhandled errors and promise rejections, displays notification with error message
 */
export function useErrorHandler () {

  /**
   * Handle global error and display notification
   */
  const handleError = (event: ErrorEvent) => {
    displayNotification({text: `Error: ${event.message}`, type: "error"});
  };

  /**
   * Handle unhandled promise rejection and display notification
   */
  const handlePromiseRejection = (event: PromiseRejectionEvent) => {
    displayNotification({text: `Unhandled Promise Rejection: ${event.reason}`, type: "error"});
  };

  useEffect(() => {
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);
}

