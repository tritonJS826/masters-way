import {CreateUserRequest, SchemasUserPlainResponse} from "src/apiAutogenerated";
import {userService} from "src/serviceUpdated/services";

/**
 * Provides methods to interact with the Users
 */
export class UserServiceU {

  /**
   * Get all users
   */
  public static async getAllUsers(): Promise<SchemasUserPlainResponse[]> {
    // Return response.json(); // Parse only if content type is JSON
    const allUsers = await userService.getAllUsers();
    // Console.log(allUsers, "!");

    return allUsers;
  }

  /**
   * Create user
   */
  public static async createUser(requestParameters: CreateUserRequest): Promise<SchemasUserPlainResponse> {
    const user = await userService.createUser(requestParameters);

    return user;
  }

}
