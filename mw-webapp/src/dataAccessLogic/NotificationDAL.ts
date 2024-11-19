import {notificationDTOToNotification} from "src/dataAccessLogic/DTOToPreviewConverter/notificationDTOToNotification";
import {Notification} from "src/model/businessModel/Notification";
import {NotificationService} from "src/service/NotificationService";

/**
 * Provides methods to interact with the Notification model
 */
export class NotificationDAL {

  /**
   * Get unread notification amount
   * @deprecated
   */
  public static async getNotificationPreview(): Promise<number> {
    const unreadMessageAmountDTO = await NotificationService.getNotificationPreview();
    const unreadMessageAmount = unreadMessageAmountDTO;

    return unreadMessageAmount;
  }

  /**
   * Get notification list by user ID
   */
  public static async getOwnNotificationList(): Promise<Notification[]> {
    const notificationListDTO = await NotificationService.getOwnNotificationList();
    const notificationList = notificationListDTO.notifications.map(notificationDTOToNotification);

    return notificationList;
  }

}
