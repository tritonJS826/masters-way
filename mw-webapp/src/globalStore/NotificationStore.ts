import {makeAutoObservable} from "mobx";
import {AllNotificationsParams, NotificationDAL} from "src/dataAccessLogic/NotificationDAL";
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
   * Amount of total notifications
   */
  public totalNotificationsAmount: number = 0;

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
   * Set total Notifications amount
   */
  public setTotalNotificationsAmount = (amount: number) => {
    this.totalNotificationsAmount = amount;
  };

  /**
   * Set notifications
   */
  public setNotifications = (notifications: Notification[]) => {
    this.notificationList = notifications;
  };

  /**
   * Load notifications
   */
  public loadNotifications = async (): Promise<AllNotificationsParams> => {
    const notifications = await NotificationDAL.getOwnNotificationList({});

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

  /**
   * Add notification to notificationList
   */
  public addNotification = (newNotification: Notification) => {
    this.notificationList = this.notificationList && [newNotification, ...this.notificationList];
  };

  /**
   * Increase notifications amount
   */
  public addUnreadNotificationToAmount = () => {
    this.unreadNotificationsAmount && this.unreadNotificationsAmount++;
  };

  /**
   * Decrease notifications amount
   */
  public deleteUnreadNotificationFromAmount = () => {
    this.unreadNotificationsAmount && this.unreadNotificationsAmount--;
  };

  /**
   * Add notifications
   */
  public addNotifications(notifications: Notification[]): void {
    this.notificationList = this.notificationList && [...this.notificationList, ...notifications];
  }

}

export const notificationStore = new NotificationStore();
