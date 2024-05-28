import {makeAutoObservable} from "mobx";
import {User} from "src/model/businessModel/User";

/**
 * All userPageOwner related methods
 */
class UserPageOwnerStore {

  /**
   * User value
   * @default null
   */
  public userPageOwner: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set user
   */
  public setUserPageOwner = (user: User | null) => {
    this.userPageOwner = user;
  };

}

export const userPageOwnerStore = new UserPageOwnerStore();
