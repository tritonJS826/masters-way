import {userToUserDTOPartial} from "src/dataAccessLogic/BusinessToDTOConverter/userToUserDTOPartial";
import {userDTOToUserConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUser";
import {userDTOToUserNotSaturatedWayConverter}
  from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserNotSaturatedWayConverter";
import {User} from "src/model/businessModel/User";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {GetUsersParams, UserService} from "src/service/UserService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * All users params
 */
export interface AllUsersParams {

  /**
   * Users amount
   */
  size: number;

  /**
   * Array of users preview
   */
  usersPreview: UserNotSaturatedWay[];
}

/**
 * Provides methods to interact with the User model
 */
export class UserDAL {

  /**
   * Get all Users
   */
  public static async getUsers(params: GetUsersParams): Promise<AllUsersParams> {
    const usersDTO = await UserService.getAllUsers(params);

    const usersPreview = usersDTO.users.map(userDTOToUserNotSaturatedWayConverter);

    const users = {
      size: usersDTO.size,
      usersPreview,
    };

    return users;
  }

  /**
   * Get user by UUID
   */
  public static async getUserByUuid(userUuid: string): Promise<User> {
    const userDTO = await UserService.getUserByUuid({userId: userUuid});
    const user = userDTOToUserConverter(userDTO);

    return user;
  }

  /**
   * Update user
   */
  public static async updateUser(user: PartialWithUuid<User>) {
    const userDTOPartial = userToUserDTOPartial(user);

    await UserService.updateUser({
      userId: user.uuid,
      request: userDTOPartial,
    });
  }

}
