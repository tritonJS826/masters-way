import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

/**
 * Provides methods to interact with the Way business model
 */
export class WayDAL {

  /**
   * Get Ways preview
   */
  public static async getWaysPreview (): Promise<WayPreview[]> {
    const waysDTO = await WayService.getWaysDTO();
    const usersPreview = await UserDAL.getUsersPreview();

    const ways: WayPreview[] = waysDTO.map((wayDTO) => {
      const owner = usersPreview
      //TODO: task #114 Use hashmap instead of .find
        .find((elem) => elem.uuid === wayDTO.ownerUuid);

      if (!owner) {
        throw new Error(`owner not found for UUID ${wayDTO.ownerUuid}`);
      }

      const currentMentors = wayDTO.currentMentors.map((currentMentorUuid) => {
        const currentMentor = usersPreview
        //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === currentMentorUuid);

        if (!currentMentor) {
          throw new Error(`currentMentor not found for UUID ${currentMentorUuid}`);
        }

        return currentMentor;
      });

      const wayProps = {
        owner,
        currentMentors,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayProps);
    });

    return ways;
  }

}