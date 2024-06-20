import {UserDTOToUserConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUser";
import {User} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";

/**
 * Provides methods to interact with the comments
 */
export class AuthDAL {

  /**
   * Call method for login
   */
  public static logIn() {
    return pages.oauth.getPath({});
  }

  /**
   * Get authorized user
   */
  public static async getAuthorizedUser(): Promise<User> {
    const userDTO = await AuthService.getCurrentUser();
    const user = UserDTOToUserConverter(userDTO);

    return user;
  }

  /**
   * Call method for logout
   */
  public static async logOut() {
    await AuthService.logOut();
  }

}
