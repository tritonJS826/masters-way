import {userDTOToUserConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUser";
import {User} from "src/model/businessModel/User";
import {AuthService} from "src/service/AuthService";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

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
  public static async getAuthorizedUser(): Promise<User> {
    const userDTO = await AuthService.getCurrentUser();
    const user = userDTOToUserConverter(userDTO);

    return user;
  }

  /**
   * Refresh token
   */
  public static async refreshToken(refreshToken: string) {
    const updatedAccessTokenData = await AuthService.refreshToken(refreshToken);
    localStorageWorker.setItemByKey("accessToken", updatedAccessTokenData.accessToken);
  }

  /**
   * Call method for logout
   */
  public static async logOut() {
    await AuthService.logOut();
    await localStorageWorker.removeItemByKey("accessToken");
    await localStorageWorker.removeItemByKey("refreshToken");
  }

}
