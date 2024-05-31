import {makeAutoObservable} from "mobx";
import {User} from "src/model/businessModel/User";

/**
 * UserPageStore related methods
 */
export class UserPageStore {

  /**
   * User value
   */
  public userPageOwner: User;

  constructor(user: User) {
    makeAutoObservable(this);
    this.userPageOwner = user;
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
