import {makeAutoObservable} from "mobx";
import {User, UserPlain} from "src/model/businessModel/User";

/**
 * All user related methods
 */
class UserStore {

  /**
   * User value
   * @default null
   */
  public user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set user
   */
  public setUser = (user: User | null) => {
    this.user = user;
  };

  /**
   * Add user to favorite
   */
  public addUserToFavorite = (userPageOwner: UserPlain): void => {
    if (this.user === null) {
      throw new Error("User is not exist");
    }
    this.user.favoriteUsers.push(userPageOwner);
  };

  /**
   * Delete user from favorite
   */
  public deleteUserFromFavorite = (userPageOwnerUuid: string): void => {
    if (this.user === null) {
      throw new Error("User is not exist");
    }
    this.user.favoriteUsers = this.user.favoriteUsers.filter(favoriteUser => favoriteUser.uuid !== userPageOwnerUuid);
  };

}

export const userStore = new UserStore();
