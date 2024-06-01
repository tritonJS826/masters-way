import {makeAutoObservable} from "mobx";
import {User} from "src/model/businessModel/User";

/**
 * All userPageOwner related methods
 */
export class UserPageOwnerStore {

  /**
   * User value
   */
  public userPageOwner: User | null = null;

  constructor() {
    makeAutoObservable(this);
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
   * Add user to favorite
   */
  public deleteUserFromFavoriteForUser = (userUuid: string): void => {
    if (!this.userPageOwner) {
      throw new Error("Page is not initialized");
    }
    this.userPageOwner.favoriteForUserUuids = this.userPageOwner.favoriteForUserUuids
      .filter(favoriteForUserUuid => favoriteForUserUuid !== userUuid);
  };

}

