import Toastify from "toastify-js";
import "src/component/notification/toastify.scss";

const DEFAULT_NOTIFICATION_DURATION = 5000;

/**
 * Notification props
 */
type NotificationParams = {

  /**
   * Text to display inside notification
   */
  text: string;

  /**
   * The time in milliseconds that should elapse before automatically closing each notification.
   * @default 5000
   */
  duration?: number;

  /**
   * Notification type
   */
  type: "info" | "error";

  /**
   * Callback function that called when user clicks on notification
   */
  onClick?: () => void;
}

/**
 * Displays a notification with the specified options.
 */
export function displayNotification (
  {text, type, duration = DEFAULT_NOTIFICATION_DURATION, onClick}: NotificationParams,
) {
  Toastify({
    text,
    duration,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    className: `toastify ${type}`,
    onClick,
  }).showToast();
}