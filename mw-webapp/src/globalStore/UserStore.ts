import {makeAutoObservable} from "mobx";
import {User, UserPlain} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

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
   * Remove all user data
   */
  public clearUser = () => {
    this.user = null;
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

  /**
   * Update user's customCollections
   */
  public updateCustomCollections = (collectionUuid: string, isWayExistInCollection: boolean, updatedWay: WayPreview): void => {
    if (this.user === null) {
      throw new Error("User is not exist");
    }
    this.user.customWayCollections.map((collection) => {

      const updatedCollection = collection.uuid === collectionUuid &&
        isWayExistInCollection
        ? collection.deleteWay(updatedWay.uuid)
        : collection.addWay(updatedWay);

      return updatedCollection;
    });

  };

}

export const userStore = new UserStore();
