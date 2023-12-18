import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {userPreviewToUserDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/userPreviewToUserDTOConverter";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserService} from "src/service/UserService";

/**
 * Provides methods to interact with the UserPreview model
 */
export class UserPreviewDAL {

  /**
   * Get all UserPreview
   */
  public static async getUsersPreview(): Promise<UserPreview[]> {
    const usersDTO = await UserService.getUsersDTO();

    const usersPreview = usersDTO.map(UserDTOToUserPreviewConverter);

    return usersPreview;
  }

  /**
   * Get User preview by uuid
   */
  public static async getUserPreview(uuid: string): Promise<UserPreview> {
    const userDTO = await UserService.getUserDTO(uuid);

    return UserDTOToUserPreviewConverter(userDTO);
  }

  /**
   * Update User
   */
  public static async updateUserPreview(userPreview: UserPreview) {
    const userDTO = userPreviewToUserDTOConverter(userPreview);
    await UserService.updateUserDTO(userDTO);
  }

}
