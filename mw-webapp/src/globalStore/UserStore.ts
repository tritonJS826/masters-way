import {makeAutoObservable} from "mobx";
import {User} from "src/model/businessModel/User";

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

}

export const userStore = new UserStore();
