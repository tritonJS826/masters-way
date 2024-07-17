import clsx from "clsx";
import Toastify from "toastify-js";
import styles from "src/component/notification/Notification.module.scss";

const DEFAULT_NOTIFICATION_DURATION = 5000;

/**
 * Type of notification's styles
 */
export enum NotificationType {

  /**
   * Info notification
   */
  INFO = "info",

  /**
   * Error notification
   */
  ERROR = "error"

}

/**
 * Notification's position
 */
export enum NotificationPosition {
  RIGHT = "right",
  LEFT = "left"
}

/**
 * SNotification's gravity
 */
export enum NotificationGravity {
  TOP = "top",
  BOTTOM="bottom"
}

/**
 * Notification props
 */
interface NotificationParams {

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
  type: NotificationType;

  /**
   * Callback function that called when user clicks on notification
   */
  onClick?: () => void;

  /**
   * Notification's position
   */
  position?: NotificationPosition;

  /**
   * Notification's gravity
   */
  gravity?: NotificationGravity;
}

/**
 * Displays a notification with the specified options.
 */
export const displayNotification = (props: NotificationParams) => {
  const notificationClassName = clsx(
    styles.toastify,
    styles[props.position ?? NotificationPosition.RIGHT],
    styles[props.type ?? NotificationType.INFO]);

  Toastify({
    text: props.text,
    duration: props.duration ?? DEFAULT_NOTIFICATION_DURATION,
    close: true,
    gravity: props.gravity ?? NotificationGravity.BOTTOM,
    stopOnFocus: true,
    className: `${notificationClassName}`,
    onClick: props.onClick,
  }).showToast();
};
