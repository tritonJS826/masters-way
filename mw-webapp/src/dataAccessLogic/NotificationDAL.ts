import {notificationDTOToNotification} from "src/dataAccessLogic/DTOToPreviewConverter/notificationDTOToNotification";
import {Notification} from "src/model/businessModel/Notification";
import {NotificationService} from "src/service/NotificationService";

/**
 * All notifications params
 */
export interface AllNotificationsParams {

  /**
   * Notifications amount
   */
  size: number;

  /**
   * Array of notifications
   */
  notificationList: Notification[];
}

/**
 * Provides methods to interact with the Notification model
 */
export class NotificationDAL {

  /**
   * Get notification list by user ID
   */
  public static async getOwnNotificationList(): Promise<AllNotificationsParams> {
    const notificationDTO = await NotificationService.getOwnNotificationList();
    const notificationList = notificationDTO.notifications.map(notificationDTOToNotification);

    const notifications = {
      size: notificationDTO.size,
      notificationList,
    };

    return notifications;
  }

}
