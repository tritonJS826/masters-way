import {enabledNotificationDTOtoEnabledNotification as notificationSettingDTOtoNotificationSetting}
  from "src/dataAccessLogic/DTOToPreviewConverter/enabledNotificationDTOtoEnabledNotification";
import {NotificationSetting as NotificationSetting} from "src/model/businessModel/EnabledNotification";
import {enabledNotificationService as notificationSettingsService} from "src/service/services";

/**
 * Provides methods to interact with the Notification settings
 */
export class EnabledNotificationSettingsDAL {

  /**
   * Update notification setting
   */
  public static async updateNotificationSetting(
    notificationSettingId: string,
    isEnabled: boolean,
  ): Promise<NotificationSetting> {
    const notificationSettingRaw = await notificationSettingsService.updateNotificationSetting({
      notificationSettingId,
      request: {isEnabled},
    });

    const notificationSetting = notificationSettingDTOtoNotificationSetting(notificationSettingRaw);

    return notificationSetting;
  }

  /**
   * Get notification setting list
   */
  public static async getNotificationSettingList():
      Promise<NotificationSetting[]> {
    const notificationSettingListRaw = await notificationSettingsService.getNotificationSettingList();

    const notificationSettingList = notificationSettingListRaw.notificationSettings.map(
      notificationSettingDTOtoNotificationSetting,
    );

    return notificationSettingList;
  }

}
