import {enabledNotificationDTOtoEnabledNotification}
  from "src/dataAccessLogic/DTOToPreviewConverter/enabledNotificationDTOtoEnabledNotification";
import {EnabledNotification} from "src/model/businessModel/EnabledNotification";
import {enabledNotificationService} from "src/service/services";

/**
 * Provides methods to interact with the Notification
 */
export class EnabledNotificationDAL {

  /**
   * Update enabled notification
   */
  public static async updateEnabledNotification(
    enabledNotificationId: string,
    isEnabled: boolean,
  ): Promise<EnabledNotification> {
    const enabledNotificationRaw = await enabledNotificationService.updateEnabledNotification({
      enabledNotificationId,
      request: {isEnabled},
    });

    const enabledNotification = enabledNotificationDTOtoEnabledNotification(enabledNotificationRaw);

    return enabledNotification;
  }

  /**
   * Get enabled notification list
   */
  public static async getEnabledNotificationList():
      Promise<EnabledNotification[]> {
    const enabledNotificationListRaw = await enabledNotificationService.getEnabledNotificationList();

    const enabledNotificationList = enabledNotificationListRaw.enabledNotifications.map(
      enabledNotificationDTOtoEnabledNotification,
    );

    return enabledNotificationList;
  }

}
