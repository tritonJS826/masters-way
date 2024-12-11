import {notificationDTOToNotification} from "src/dataAccessLogic/DTOToPreviewConverter/notificationDTOToNotification";
import {Notification} from "src/model/businessModel/Notification";
import {NotificationService} from "src/service/NotificationService";

/**
 * Get Notifications params
 */
export interface GetNotificationsParams {

  /**
   * Is notification new
   */
  isOnlyNew?: boolean;

  /**
   * Page
   */
  page?: number;

  /**
   * Limit
   */
  limit?: number;

}

/**
 * All notifications params
 */
export interface AllNotificationsParams {

  /**
   * Unread Notifications amount
   */
  unreadSize: number;

  /**
   * Total notifications amount
   */
  totalSize: number;

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
  public static async getOwnNotificationList(requestParameters: GetNotificationsParams): Promise<AllNotificationsParams> {
    const notificationDTO = await NotificationService.getOwnNotificationList(requestParameters);
    const notificationList = notificationDTO.notifications.map(notificationDTOToNotification);

    const notifications = {
      unreadSize: notificationDTO.unreadSize,
      totalSize: notificationDTO.totalSize,
      notificationList,
    };

    return notifications;
  }

  /**
   * Update notification
   */
  public static async updateNotification(notificationId: string): Promise<Notification> {
    const notificationDTO = await NotificationService.updateNotification({
      notificationId,
      request: {isRead: true},
    });
    const updatedNotification = notificationDTOToNotification(notificationDTO);

    return updatedNotification;
  }

}
