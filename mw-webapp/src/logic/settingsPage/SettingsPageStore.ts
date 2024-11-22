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
   * Add user to favorite
   */
  //   public addUserToFavoriteForUser = (userUuid: string): void => {
  //     if (!this.userPageOwner) {
  //       throw new Error("Page is not initialized");
  //     }
  //     this.userPageOwner.favoriteForUserUuids.push(userUuid);
  //   };

  /**
   * Delete user from favorite
   */
  //   public deleteUserFromFavoriteForUser = (userUuid: string): void => {
  //     if (!this.userPageOwner) {
  //       throw new Error("Page is not initialized");
  //     }
  //     this.userPageOwner.favoriteForUserUuids = this.userPageOwner.favoriteForUserUuids
  //       .filter(favoriteForUserUuid => favoriteForUserUuid !== userUuid);
  //   };

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
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
