import {makeAutoObservable} from "mobx";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";

/**
 * Available notification tags
 */
export enum SystemNotificationTag {
  TEST = "test-notification-tag"
}

/**
 * {@link ServiceWorker.systemNotification} params
 */
type SystemNotificationParams = {

  /**
   * Notification title
   */
  title: string;

  /**
   * Notification text
   */
  text: string;

  /**
   * Notification tag
   */
  tag: SystemNotificationTag;
}

/**
 * System notification service worker
 */
class ServiceWorker {

  /**
   * Is system notification available
   */
  public isNotificationsEnabled: boolean = false;

  /**
   * User value
   * @default null
   */
  private serviceWorker: ServiceWorkerRegistration | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Request permissions for system notification with service worker
   */
  public requestPermission = async () => {
    const isNotificationAvailable = "Notification" in window;
    if (!isNotificationAvailable) {
      throw new Error("Notification is not available");
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // eslint-disable-next-line no-console
      console.log("Notification permission granted.");
    } else {
      // eslint-disable-next-line no-console
      console.log("Notification permission denied.");
    }

    this.getNotificationPermissions();
  };

  /**
   * Set user
   */
  public register = async () => {
    const isNotificationAvailable = "Notification" in window;
    if (!isNotificationAvailable) {
      // eslint-disable-next-line no-console
      console.log("Notification is not available in window");

      return;
    }

    try {
      const serviceWorker = await navigator.serviceWorker.register("/serviceWorker.js");
      // eslint-disable-next-line no-console
      console.log("ServiceWorker registration successful with scope: ", serviceWorker.scope);
      this.serviceWorker = serviceWorker;
    } catch (error) {
      displayNotification({
        text: "Service worker registration error! Should work in chrome!",
        type: NotificationType.ERROR,
      });
    }

    this.getNotificationPermissions();
  };

  /**
   * Show system notification
   */
  public systemNotification = (params: SystemNotificationParams) => {
    if (!this.serviceWorker) {
      throw new Error("service worker is not exist");
    }

    if (!this.isNotificationsEnabled) {
      return;
    }

    this.serviceWorker.showNotification(params.title, {
      body: params.text,
      icon: "/logo192x192.png",
      tag: params.tag,
    });
  };

  /**
   * Update current permissions in instance
   */
  private getNotificationPermissions = () => {
    const isNotificationAvailable = "Notification" in window;
    if (!isNotificationAvailable) {
      // eslint-disable-next-line no-console
      console.log("Notification is not available in window");

      return;
    }
    const permission = Notification.permission;

    if (permission === "granted") {
      this.isNotificationsEnabled = true;
      // eslint-disable-next-line no-console
      console.log("Notifications are enabled.");
    } else if (permission === "denied") {
      this.isNotificationsEnabled = false;
      // eslint-disable-next-line no-console
      console.log("Notifications are denied.");
    } else {
      this.isNotificationsEnabled = false;
      // eslint-disable-next-line no-console
      console.log("Notifications permission is not requested yet.");
    }
  };

}

export const serviceWorkerStore = new ServiceWorker();
