import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {UserDALPreview} from "src/dataAccessLogic/UserDALPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

/**
 * Provides methods to interact with the Way business model
 */
export class WayDALPreview {

  /**
   * Get all Ways preview
   */
  public static async getWaysPreview (): Promise<WayPreview[]> {
    const waysDTO = await WayService.getWaysDTO();
    const ways = await Promise.all(waysDTO.map(async (wayDTO) => {
      const owner = await UserDALPreview.getUserPreview(wayDTO.ownerUuid);

      const currentMentorsPromises = wayDTO.currentMentors.map((currentMentorUuid) => {
        return UserDALPreview.getUserPreview(currentMentorUuid);
      });
      const currentMentors = await Promise.all(currentMentorsPromises);

      const wayProps = {
        owner,
        currentMentors,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayProps);
    }));

    return ways;
  }

  /**
   * Get Ways preview owned by User
   */
  public static async getOwnedWaysPreview(uuid: string): Promise<WayPreview[]> {
    const waysDTO = await WayService.getOwnedWaysDTO(uuid);
    const userPreview = await UserDALPreview.getUserPreview(uuid);
    const ways = await Promise.all(waysDTO.map(async (wayDTO) => {
      const currentMentorsPromises = wayDTO.currentMentors.map((currentMentorUuid) => {
        return UserDALPreview.getUserPreview(currentMentorUuid);
      });

      const currentMentors = await Promise.all(currentMentorsPromises);

      const wayProps = {
        owner: userPreview,
        currentMentors,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayProps);
    }));

    return ways;
  }

}