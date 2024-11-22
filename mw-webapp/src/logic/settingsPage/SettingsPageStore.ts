import {makeAutoObservable} from "mobx";
import {EnabledNotificationSettingsDAL} from "src/dataAccessLogic/NotificationSettingsDAL";
import {load} from "src/hooks/useLoad";
import {NotificationSetting} from "src/model/businessModel/EnabledNotification";

/**
 * SettingsPage related methods
 */
export class SettingsPageStore {

  /**
   * User value
   */
  public notificationSettingList!: NotificationSetting[];

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  /**
   * Set user
   */
  public setEnabledNotificationList = (
    enabledNotificationList: NotificationSetting[],
  ) => {
    this.notificationSettingList = enabledNotificationList;
  };

  /**
   * Initialize
   */
  private async initialize() {
    await load<NotificationSetting[]>({

      /**
       * Load data
       */
      loadData: () => this.loadData(),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setEnabledNotificationList,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (): Promise<NotificationSetting[]> => {
    const enabledNotificationList = await EnabledNotificationSettingsDAL.getNotificationSettingList();

    return enabledNotificationList;
  };

  /**
   * Validate data
   */
  private validateData = (data: NotificationSetting[]) => {
    return !!data.length;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
