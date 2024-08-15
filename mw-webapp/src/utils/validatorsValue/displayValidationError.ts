import {displayNotification, NotificationType} from "src/component/notification/displayNotification";

/**
 * Display notification error
 */
export const displayValidationError = (error: string) => {
  displayNotification({
    text: error,
    type: NotificationType.INFO,
  });
};
