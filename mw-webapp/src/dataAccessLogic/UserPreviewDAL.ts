import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
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

}