import {makeAutoObservable} from "mobx";
import {EnabledNotificationDAL} from "src/dataAccessLogic/EnabledNotificationDAL";
import {load} from "src/hooks/useLoad";
import {EnabledNotification} from "src/model/businessModel/EnabledNotification";

/**
 * SettingsPage related methods
 */
export class SettingsPageStore {

  /**
   * User value
   */
  public enabledNotificationList!: EnabledNotification[];

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
    enabledNotificationList: EnabledNotification[],
  ) => {
    this.enabledNotificationList = enabledNotificationList;
  };

  /**
   * Initialize
   */
  private async initialize() {
    await load<EnabledNotification[]>({

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
  private loadData = async (): Promise<EnabledNotification[]> => {
    const enabledNotificationList = await EnabledNotificationDAL.getEnabledNotificationList();

    return enabledNotificationList;
  };

  /**
   * Validate data
   */
  private validateData = (data: EnabledNotification[]) => {
    return !!data.length;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
