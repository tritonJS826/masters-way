import {makeAutoObservable} from "mobx";

/**
 * Notification's props
 */
interface NotificationDTO {

  /**
   * If true - notification was read
   */
  isRead: boolean;

  /**
   * Notification's title
   */
  title: string;

  /**
   * Notification's description
   */
  description: string;

  /**
   * Notification ID
   */
  id: string;

}

/**
 * Notification model
 */
export class Notification {

  /**
   * If true - notification was read
   */
  public isRead: boolean;

  /**
   * Notification's title
   */
  public title: string;

  /**
   * Notification's description
   */
  public description: string;

  /**
   * Notification ID
   */
  public id: string;

  constructor(chatData: NotificationDTO) {
    makeAutoObservable(this);
    this.id = chatData.id;
    this.title = chatData.title;
    this.description = chatData.description;
    this.isRead = chatData.isRead;
  }

  /**
   * Update isRead value
   */
  // public updateIsRead(isReadToUpdate: boolean): void {
  //   this.isRead = isReadToUpdate;
  // }

}
