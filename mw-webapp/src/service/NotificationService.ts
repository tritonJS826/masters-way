import {Notification} from "src/model/businessModel/Notification";

/**
 * Provides methods to interact with the Notification
 */
export class NotificationService {

  /**
   * Get unread notification amount
   */
  public static async getNotificationPreview(): Promise<number> {
    const unreadNotificationAmount = await 0;

    return unreadNotificationAmount;
  }

  /**
   * Get notification list by user ID
   */
  public static async getNotificationListById(): Promise<Notification[]> {
    const notificationList = await [];

    return notificationList;
  }

}
