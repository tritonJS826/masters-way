import {makeAutoObservable} from "mobx";
import {localStorageWorker, Token} from "src/utils/LocalStorageWorker";

/**
 * All token related methods
 */
class TokenStore {

  /**
   * Language value
   * @default {@link DEFAULT_LANGUAGE}
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
   * Load language
   */
  public loadAccessToken = () => {
    const tokenData = localStorageWorker.getItemByKey<Token>("token");

    this.setAccessToken(tokenData?.token ?? null);
  };

}

export const tokenStore = new TokenStore();
