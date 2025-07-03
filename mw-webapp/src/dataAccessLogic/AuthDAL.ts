import {currentUserDTOToCurrentUserConverter} from "src/dataAccessLogic/DTOToPreviewConverter/currentUserDTOToCurrentUser";
import {tokenStore} from "src/globalStore/TokenStore";
import {CurrentUser} from "src/model/businessModel/CurrentUser";
import {AuthService} from "src/service/AuthService";

/**
 * Provides methods to interact with the comments
 */
export class AuthDAL {

  /**
   * Call method for login
   */
  public static authGoogle() {
    AuthService.authGoogle();
  }

  /**
   * Get authorized user
   */
  public static async getAuthorizedUser(): Promise<CurrentUser> {
    const userDTO = await AuthService.getCurrentUser();
    const user = currentUserDTOToCurrentUserConverter(userDTO);

    return user;
  }

  /**
   * Refresh token
   */
  public static async refreshToken(refreshToken: string) {
    const updatedAccessTokenData = await AuthService.refreshToken(refreshToken);
    tokenStore.setTokens({
      accessToken: updatedAccessTokenData.accessToken,
      refreshToken,
    });
  }

  /**
   * Call method for logout
   */
  public static async logOut() {
    await AuthService.logOut();
    tokenStore.resetTokens();
  }

}
