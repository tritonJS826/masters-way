import {makeAutoObservable} from "mobx";
import {NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";

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
  nature: NotificationNature;

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
   * Nature of the notification (like jobDone created, mentor request applied etc.)
   */
  public nature: NotificationNature;

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
  public updateIsRead(isReadToUpdate: boolean): void {
    this.isRead = isReadToUpdate;
  }

}
