import {UserDTOToUserPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/userDTOToUserPreviewConverter";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserService} from "src/service/UserService";

/**
 * Provides methods to interact with the User business model
 */
export class UserDAL {

  /**
   * Get Users preview
   */
  public static async getUsersPreview (): Promise<UserPreview[]> {
    const waysPreview = await WayDAL.getWaysPreview();
    const usersDTO = await UserService.getUsersDTO();

    const users = usersDTO.map((userPreview) => {
      const ownWays = userPreview.ownWays.map((ownWayUuid) => {
        const ownWay = waysPreview
        //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === ownWayUuid);

        if (!ownWay) {
          throw new Error(`ownWay not found for UUID ${ownWayUuid}`);
        }

        return ownWay;
      });

      return UserDTOToUserPreviewConverter(userPreview, ownWays);
    });

    return users;
  }

}