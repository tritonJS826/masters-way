import {makeAutoObservable} from "mobx";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {load} from "src/hooks/useLoad";
import {User} from "src/model/businessModel/User";

/**
 * UserPageStore related methods
 */
export class UserPageStore {

  /**
   * User value
   */
  public userPageOwner!: User;
  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(userPageOwnerUuid: string) {
    makeAutoObservable(this);
    this.initialize(userPageOwnerUuid);
  }

  /**
   * Set user
   */
  public setUserPageOwner = (user: User) => {
    this.userPageOwner = user;
  };

  /**
   * Add user to favorite
   */
  public addUserToFavoriteForUser = (userUuid: string): void => {
    if (!this.userPageOwner) {
      throw new Error("Page is not initialized");
    }
    this.userPageOwner.favoriteForUserUuids.push(userUuid);
  };

  /**
   * Delete user from favorite
   */
  public deleteUserFromFavoriteForUser = (userUuid: string): void => {
    if (!this.userPageOwner) {
      throw new Error("Page is not initialized");
    }
    this.userPageOwner.favoriteForUserUuids = this.userPageOwner.favoriteForUserUuids
      .filter(favoriteForUserUuid => favoriteForUserUuid !== userUuid);
  };

  /**
   * Initialize
   */
  private async initialize(userPageOwnerUuid: string) {
    await load<User>({

      /**
       * Load data
       */
      loadData: () => this.loadData(userPageOwnerUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setUserPageOwner,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (userPageOwnerUuid: string): Promise<User> => {
    const fetchedUser = await UserDAL.getUserByUuid(userPageOwnerUuid);

    return fetchedUser;
  };

  /**
   * Validate data
   */
  private validateData = (data: User) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
