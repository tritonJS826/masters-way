import {useEffect, useState} from "react";

/**
 * Custom hook to handle global unhandled errors and promise rejections, returns error message
 */
export const useErrorHandler = () => {
  const [error, setError] = useState<string>("");

  /**
   * Sets a new error message, ensuring the state updates even if the message is the same
   */
  const setNewError = (newError: string) => {
    setError("");
    setTimeout(() => setError(newError), 0);
  };

  /**
   * Handles global errors and sets error message to state
   */
  const handleError = (event: ErrorEvent) => {
    setNewError(`Error: ${event.message}`);
  };

  /**
   * Handles unhandled promise rejections and sets error message to state
   */
  const handlePromiseRejection = (event: PromiseRejectionEvent) => {
    setNewError(`Unhandled Promise Rejection: ${event.reason}`);
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
