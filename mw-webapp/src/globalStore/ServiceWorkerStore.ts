import {makeAutoObservable} from "mobx";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";

/**
 * System notification service worker
 */
class ServiceWorker {

  /**
   * User value
   * @default null
   */
  public serviceWorker: ServiceWorkerRegistration | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set user
   */
  public register = async () => {
    if ("serviceWorker" in navigator) {
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
    }
  };

  /**
   * Remove all user data
   */
  public clearUser = () => {
    this.serviceWorker = null;
  };

}

export const serviceWorkerStore = new ServiceWorker();
