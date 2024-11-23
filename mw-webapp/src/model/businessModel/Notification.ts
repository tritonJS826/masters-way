import {makeAutoObservable} from "mobx";

/**
 * Notification's props
 */
interface NotificationDTO {

  /**
   * Date when Notification was created
   */
  createdAt: Date;

  /**
   * If true - notification was read
   */
  isRead: boolean;

  /**
   * Notification's nature
   */
  nature: string;

  /**
   * Path to info mentioned in the notification
   */
  url: string;

  /**
   * User UUID that mentioned in the notification
   */
  userUuid: string;

  /**
   * Notification's description
   */
  description: string;

  /**
   * Notification UUID
   */
  uuid: string;

}

/**
 * Notification model
 */
export class Notification {

  /**
   * Date when Notification was created
   */
  public createdAt: Date;

  /**
   * Notification's description
   */
  public description: string;

  /**
   * If true - notification was read
   */
  public isRead: boolean;

  /**
   * Notification's nature
   */
  public nature: string;

  /**
   * Path to info mentioned in the notification
   */
  public url: string;

  /**
   * User UUID that mentioned in the notification
   */
  public userUuid: string;

  /**
   * Notification UUID
   */
  public uuid: string;

  constructor(notificationData: NotificationDTO) {
    makeAutoObservable(this);
    this.uuid = notificationData.uuid;
    this.userUuid = notificationData.userUuid;
    this.description = notificationData.description;
    this.isRead = notificationData.isRead;
    this.createdAt = notificationData.createdAt;
    this.nature = notificationData.nature;
    this.url = notificationData.url;
  }

  /**
   * Update isRead value
   */
  // public updateIsRead(isReadToUpdate: boolean): void {
  //   this.isRead = isReadToUpdate;
  // }

}
