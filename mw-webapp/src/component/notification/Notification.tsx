import {ReactElement} from "react";
import {Cross2Icon} from "@radix-ui/react-icons";
import {Close, Description, Provider, Root, Viewport} from "@radix-ui/react-toast";
import styles from "src/component/notification/Notification.module.scss";

/**
 * Control the sensitivity of the toast for accessibility purposes.
 * Foreground - for toasts that are the result of a user action.
 * Background - for toasts generated from background tasks .
 */
export enum NotificationType {
  "foreground" = "foreground",
  "background" = "background",
}

/**
 * Notification props
 */
interface NotificationProps {

  /**
   * The time in milliseconds that should elapse before automatically closing each toast.
   * @default 5000
   */
  duration?: number;

  /**
   * An author-localized label for each toast.
   * Used to help screen reader users associate the interruption with a toast.
   * @default "Notification"
   */
  label?: string;

  /**
   * The content to display within the notification.
   */
  content: ReactElement<HTMLElement>;

  /**
   * Notification type
   * @default "foreground"
   */
  type?: NotificationType;
}

/**
 * Notification component
 */
export const Notification = (props: NotificationProps) => {
  return (
    <Provider
      duration={props.duration}
      label={props.label}
    >
      <Root className={styles.noticeRoot}>
        <Description asChild>
          {props.content}
        </Description>
        <Close
          className={styles.closeButton}
          aria-label="Close"
        >
          <Cross2Icon />
        </Close>
      </Root>
      <Viewport className={styles.noticeViewport} />
    </Provider>
  );
};
