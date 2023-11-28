import {useEffect, useState} from "react";
import {Notification, NotificationType} from "src/component/notification/Notification";

type ErrorState = {

  /**
   * Error message
   */
  message: string;

  /**
   * Number of milliseconds measured relative to the time origin
   */
  timestamp: number;
}

/**
 * Handles global unhandled errors and promise rejections
 * @returns Notification component and a function to trigger the display of a notification.
 */
export function useErrorNotification () {
  const [error, setError] = useState<ErrorState>({message: "", timestamp: 0});

  /**
   * Handles global errors and sets error message to state
   */
  const handleError = (event: ErrorEvent) => {
    setError({message: `Error: ${event.message}`, timestamp: event.timeStamp});
  };

  /**
   * Handles unhandled promise rejections and sets error message to state
   */
  const handlePromiseRejection = (event: PromiseRejectionEvent) => {
    setError({message: `Unhandled Promise Rejection: ${event.reason}`, timestamp: event.timeStamp});
  };

  /**
   * Updates the error state to trigger the display of a notification
   */
  const triggerErrorNotification = (message: string) => {
    useEffect(() => {
      setError({message, timestamp: Date.now()});
    }, []);
  };

  useEffect(() => {
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);

  const ErrorNotification = error.message
    ? (
      <Notification
        key={error.timestamp}
        content={<div>
          {error.message}
        </div>}
        type={NotificationType.foreground}
      />
    )
    : null;

  return {ErrorNotification, triggerErrorNotification};
}

