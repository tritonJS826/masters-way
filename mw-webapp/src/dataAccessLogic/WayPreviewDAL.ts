import {Timestamp} from "firebase/firestore";
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

    const lastUpdate = wayDTO.lastUpdate.toDate();
    const createdAt = wayDTO.createdAt.toDate();

    const wayPreviewProps = {
      owner,
      mentors,
      mentorRequests,
      goal,
      lastUpdate,
      createdAt,
    };

    const wayPreview = wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);

    return wayPreview;
  }

  /**
   * Get User ways preview based of provided type
   */
  public static async getUserWaysPreview(uuid: string, type: "Own" | "Mentoring" | "Favorite"): Promise<WayPreview[]> {
    let waysDTO;

    switch (type) {
      case "Own":
        waysDTO = await WayService.getOwnWaysDTO(uuid);
        break;
      case "Mentoring":
        waysDTO = await WayService.getMentoringWaysDTO(uuid);
        break;
      case "Favorite":
        waysDTO = await WayService.getFavoriteWaysDTO(uuid);
        break;
    }

    const waysUuids = waysDTO.map((item) => item.uuid);

    const waysPreview = await Promise.all(waysUuids.map(WayPreviewDAL.getWayPreview));

    return waysPreview;
  }

  /**
   * Update Way
   */
  public static async updateWayPreview(wayPreview: WayPreview) {
    const ownerUuid = wayPreview.owner.uuid;
    const goalUuid = wayPreview.goal.uuid;
    const mentorRequestUuids = wayPreview.mentorRequests.map((item) => item.uuid);
    const mentorsUuids = wayPreview.mentors.map((item) => item.uuid);
    const lastUpdate = Timestamp.fromDate(wayPreview.lastUpdate);
    const favoriteForUserUuids = wayPreview.favoriteForUserUuids;
    const createdAt = Timestamp.fromDate(wayPreview.createdAt);

    const wayDTOProps = {
      ownerUuid,
      goalUuid,
      mentorRequestUuids,
      mentorsUuids,
      lastUpdate,
      favoriteForUserUuids,
      createdAt,
    };

    const wayDTO = wayPreviewToWayDTOConverter(wayPreview, wayDTOProps);
    await WayService.updateWayDTO(wayDTO);
  }

}
