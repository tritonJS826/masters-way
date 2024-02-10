import {userToUserDTOPartialConverter}
  from "src/dataAccessLogic/BusinessToDTOConverter/userPreviewToUserPreviewDTOPartialConverter";
import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {GetUsersParams, UserService} from "src/service/UserService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the UserPreview model
 */
export class UserPreviewDAL {

  /**
   * Get amount of all users in collection
   */
  public static async getUsersPreviewAmount(filterEmail?: string): Promise<number> {
    return await UserService.getUsersDTOAmount(filterEmail);
  }

  /**
   * Get all UserPreview
   */
  public static async getUsersPreview(params: GetUsersParams): Promise<UserPreview[]> {
    const usersDTO = await UserService.getUsersDTO(params);

    const usersPreview = usersDTO.map(UserDTOToUserPreviewConverter);

    return usersPreview;
  }

  /**
   * Get UsersPreview by uuids
   */
  public static async getUsersPreviewByUuids(userUuids: string[]): Promise<UserPreview[]> {
    const usersDTO = userUuids.length ? await UserService.getUsersDTOByUuids(userUuids) : [];

    const usersPreview = usersDTO.map(UserDTOToUserPreviewConverter);

    return usersPreview;
  }

  /**
   * Get User preview by uuid
   */
  public static async getUserPreview(uuid: string): Promise<UserPreview> {
    const userDTO = await UserService.getUserDTO(uuid);

    const userPreview = UserDTOToUserPreviewConverter(userDTO);

    return userPreview;
  }

  /**
   * Update User
   */
  public static async updateUserPreview(userPreviewPartial: PartialWithUuid<UserPreview>) {
    const userPartialDTO = userToUserDTOPartialConverter(userPreviewPartial);
    await UserService.updateUserDTO(userPartialDTO);
  }

}
