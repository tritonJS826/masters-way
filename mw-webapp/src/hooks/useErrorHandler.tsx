import {useEffect} from "react";
import {displayNotification} from "src/component/notification/Notification";

/**
 * Handles global unhandled errors and promise rejections
 */
export function useErrorHandler () {

  /**
   * Handles global errors and displays notification
   */
  const handleError = (event: ErrorEvent) => {
    displayNotification({text: `Error: ${event.message}`, type: "error"});
  };

  /**
   * Handles unhandled promise rejections and sets error message to state
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

