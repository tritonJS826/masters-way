import {makeAutoObservable} from "mobx";
import {localStorageWorker, Token} from "src/utils/LocalStorageWorker";

/**
 * {@link TokenStore.setTokens} params
 */
interface SetAccessTokensParams {

  /**
   * Access token value
   */
  accessToken: string | null;

  /**
   * Refresh token value
   */
  refreshToken: string | null;
}

/**
 * All token related methods
 */
class TokenStore {

  /**
   * Access token value
   */
  public accessToken: string | null = null;

  /**
   * Refresh token value
   */
  public refreshToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadTokens();
  }

  /**
   * Clear token
   */
  public resetTokens = () => {
    this.accessToken = null;
    this.refreshToken = null;
    localStorageWorker.removeItemByKey("accessToken");
    localStorageWorker.removeItemByKey("refreshToken");
  };

  /**
   * Set token
   */
  public setTokens = (params: SetAccessTokensParams) => {
    localStorageWorker.setItemByKey("accessToken", {token: params.accessToken});
    localStorageWorker.setItemByKey("refreshToken", {token: params.refreshToken});
    this.accessToken = params.accessToken;
    this.refreshToken = params.refreshToken;
  };

  /**
   * Load token
   */
  public loadTokens = () => {
    const tokenData = localStorageWorker.getItemByKey<Token>("accessToken");
    const refreshTokenData = localStorageWorker.getItemByKey<Token>("refreshToken");

    this.setTokens({
      accessToken: tokenData?.token ?? null,
      refreshToken: refreshTokenData?.token ?? null,
    });
  };

}

export const tokenStore = new TokenStore();
