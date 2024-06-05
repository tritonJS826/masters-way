import {makeAutoObservable} from "mobx";
import {DefaultWayCollections, User, UserPlain, WayCollection} from "src/model/businessModel/User";
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
    const updatedCollections = this.user.customWayCollections.map((collection) => {
      return collection.uuid !== collectionUuid
        ? collection
        : new WayCollection({
          ...collection,
          ways: isWayExistInCollection
            ? collection.ways.filter(wayCollection => wayCollection.uuid !== collectionUuid)
            : collection.ways.concat(updatedWay),
        });
    });

    this.user.customWayCollections = updatedCollections;
  };

  /**
   * Update user's defaultOwnCollection
   */
  public updateDefaultOwnCollection = (isWayExistInComposite: boolean, compositeWayUuid: string, wayUuid: string): void => {
    if (this.user === null) {
      throw new Error("User is not exist");
    }
    const updatedWays = this.user.defaultWayCollections.own.ways.map((way) => {
      return way.uuid !== wayUuid
        ? way
        : new WayPreview({
          ...way,
          childrenUuids: isWayExistInComposite
            ? way.childrenUuids.filter(child => child !== wayUuid)
            : way.childrenUuids.concat(wayUuid),
        });
    });

    const updatedCollection = new WayCollection({
      ...this.user.defaultWayCollections.own,
      ways: updatedWays,
    });

    const updatedCollections = new DefaultWayCollections({
      ...this.user.defaultWayCollections,
      own: updatedCollection,
    });

    this.user.defaultWayCollections = updatedCollections;
  };

}

export const userStore = new UserStore();
