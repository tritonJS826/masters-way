import {makeAutoObservable} from "mobx";
import {localStorageWorker, Token} from "src/utils/LocalStorageWorker";

/**
 * All token related methods
 */
class TokenStore {

  /**
   * Access token value
   */
  public accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadAccessToken();
  }

  /**
   * Set token
   */
  public setAccessToken = (token: string | null) => {
    localStorageWorker.setItemByKey("token", {token});
    this.accessToken = token;
  };

  /**
   * Load token
   */
  public loadAccessToken = () => {
    const tokenData = localStorageWorker.getItemByKey<Token>("token");

    this.setAccessToken(tokenData?.token ?? null);
  };

}

export const tokenStore = new TokenStore();
