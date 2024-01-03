import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {wayPreviewToWayDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/wayPreviewToWayDTOConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayService} from "src/service/WayService";

/**
 * Provides methods to interact with the WayPreview model
 */
export class WayPreviewDAL {

  /**
   * Get all WayPreview
   */
  public static async getWaysPreview(): Promise<WayPreview[]> {
    const waysDTO = await WayService.getWaysDTO();
    const waysUuids = waysDTO.map((item) => item.uuid);

    const waysPreview = await Promise.all(waysUuids.map(WayPreviewDAL.getWayPreview));

    return waysPreview;
  }

  /**
   * Get WayPreview
   */
  public static async getWayPreview(uuid: string): Promise<WayPreview> {
    const wayDTO = await WayService.getWayDTO(uuid);

    const ownerPromise = UserPreviewDAL.getUserPreview(wayDTO.ownerUuid);

    const mentorsPromise = Promise.all(wayDTO.mentorUuids.map(UserPreviewDAL.getUserPreview));

    const mentorRequestsPromise = Promise.all(wayDTO.mentorRequestUuids.map(UserPreviewDAL.getUserPreview));

    const goalPromise = await GoalPreviewDAL.getGoal(wayDTO.goalUuid);

    const [
      owner,
      mentors,
      mentorRequests,
      goal,
    ] = await Promise.all([
      ownerPromise,
      mentorsPromise,
      mentorRequestsPromise,
      goalPromise,
    ]);

    const wayPreviewProps = {
      owner,
      mentors,
      mentorRequests,
      goal,
    };

    const wayPreview = wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);

    return wayPreview;
  }

  /**
   * Update Way
   */
  public static async updateWayPreview(wayPreview: WayPreview) {
    const wayDTO = wayPreviewToWayDTOConverter(wayPreview);
    await WayService.updateWayDTO(wayDTO);
  }

}
