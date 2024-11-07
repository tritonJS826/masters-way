import {makeAutoObservable} from "mobx";
import {NotificationDAL} from "src/dataAccessLogic/NotificationDAL";
import {Notification} from "src/model/businessModel/Notification";

/**
 * Notification related methods
 */
export class NotificationStore {

  /**
   * If true then notification is open
   * @default false
   */
  public isNotificationOpen: boolean = false;

  /**
   * Amount of all unread notifications
   */
  public unreadNotificationsAmount: number | null = null;

  /**
   * Notification list
   */
  public notificationList: Notification[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set notification open or close
   * @default false
   */
  public setIsNotificationOpen = (isNotificationBlockOpen: boolean) => {
    this.isNotificationOpen = isNotificationBlockOpen;
  };

  /**
   * Set unreadNotificationsAmount
   */
  public setUnreadNotificationsAmount = (amount: number) => {
    this.unreadNotificationsAmount = amount;
  };

  /**
   * Set notifications
   */
  public setNotifications = (notifications: Notification[]) => {
    this.notificationList = notifications;
  };

  /**
   * Load unread notifications amount
   */
  public loadUnreadNotificationsAmount = async (): Promise<number> => {
    const unreadNotificationsAmount = await NotificationDAL.getNotificationPreview();

    return unreadNotificationsAmount;

  };

  /**
   * Load notifications
   */
  public loadNotifications = async (): Promise<Notification[]> => {
    const notifications = await NotificationDAL.getNotificationListById();

    return notifications;

  };

  /**
   * Remove all notification data
   */
  public clearNotificationStore = () => {
    this.isNotificationOpen = false;
    this.notificationList = null;
    this.unreadNotificationsAmount = null;
  };

}

export const notificationStore = new NotificationStore();
