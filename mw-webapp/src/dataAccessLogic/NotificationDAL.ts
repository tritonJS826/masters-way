import {notificationDTOToNotification} from "src/dataAccessLogic/DTOToPreviewConverter/notificationDTOToNotification";
import {Notification} from "src/model/businessModel/Notification";
import {NotificationService} from "src/service/NotificationService";

/**
 * Provides methods to interact with the Notification model
 */
export class NotificationDAL {

  /**
   * Get unread notification amount
   */
  public static async getNotificationPreview(): Promise<number> {
    const notificationDTO = await NotificationService.getNotificationList();
    const unreadNotificationAmount = notificationDTO.size;

    return unreadNotificationAmount;
  }

  /**
   * Get notification list by user ID
   */
  public static async getNotificationListById(): Promise<Notification[]> {
    const notificationListDTO = await NotificationService.getNotificationList();
    const notificationList = notificationListDTO.notifications.map(notificationDTOToNotification);

    return notificationList;
  }

}
