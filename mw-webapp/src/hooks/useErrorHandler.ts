import {useEffect, useState} from "react";

/**
 * Custom hook to handle global unhandled errors and promise rejections.
 */
export const useErrorHandler = () => {
  const [error, setError] = useState("");

  /**
   * Handles global errors and sets error message to state
   */
  const handleError = (event: ErrorEvent) => {
    setError(`Error: ${event.message}`);
  };

  /**
   * Handles unhandled promise rejections and sets error message to state
   */
  const handlePromiseRejection = (event: PromiseRejectionEvent) => {
    setError(`Unhandled Promise Rejection: ${event.reason}`);
  };

  useEffect(() => {
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, []);

  return error;
};
