import {SchemasUserPopulatedResponse} from "src/apiAutogenerated";
import {authService} from "src/service/services";

/**
 * Provides methods to interact with the Comments collection
 */
export class AuthService {

  /**
   * Call method for logout
   */
  public static async logOut() {
    await authService.logoutCurrentAuthorizedUser();
  }

  /**
   * Get current authorized user data
   */
  public static async getCurrentUser(): Promise<SchemasUserPopulatedResponse> {
    const user = await authService.getCurrentAuthorizedUser();

    return user;
  }

}
