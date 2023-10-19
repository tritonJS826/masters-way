import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserService} from "src/service/UserService";

/**
 * Provides methods to interact with the User business model
 */
export class UserDALPreview {

  /**
   * Get Users preview
   */
  public static async getUsersPreview (): Promise<UserPreview[]> {
    const usersDTO = await UserService.getUsersDTO();
    const users = usersDTO.map((userDTO) => {
      return UserDTOToUserPreviewConverter(userDTO);
    });

    return users;
  }

  /**
   * Get User preview by uuid
   */
  public static async getUserPreview (uuid: string): Promise<UserPreview> {
    const userDTO = await UserService.getUserDTO(uuid);

    return UserDTOToUserPreviewConverter(userDTO);
  }

}