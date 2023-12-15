import {Timestamp, writeBatch} from "firebase/firestore";
import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {wayPreviewToWayDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/WayPreviewToWayDTOConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {db} from "src/firebase";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {UserService} from "src/service/UserService";
import {WayDTOWithoutUuid, WayService} from "src/service/WayService";
import {DateUtils} from "src/utils/DateUtils";

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

    const owner = await UserPreviewDAL.getUserPreview(wayDTO.ownerUuid);

    const mentors = await Promise.all(wayDTO.mentorUuids.map(UserPreviewDAL.getUserPreview));

    const mentorRequests = await Promise.all(wayDTO.mentorRequestUuids.map(UserPreviewDAL.getUserPreview));

    const goal = await GoalPreviewDAL.getGoalPreview(wayDTO.goalUuid);

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
   * Create WayPreview with empty fields and autogenerated uuid
   */
  public static async createWayPreview(userUuid: string): Promise<WayPreview> {
    const user = await UserPreviewDAL.getUserPreview(userUuid);
    const newGoal = await GoalPreviewDAL.createGoalPreview();

    const DEFAULT_WAY: WayDTOWithoutUuid = {
      name: `${DateUtils.getShortISODateValue(new Date())} Way of ${user.name}`,
      dayReportUuids: [],
      ownerUuid: `${userUuid}`,
      goalUuid: `${newGoal.uuid}`,
      mentorUuids: [],
      mentorRequestUuids: [],
      isCompleted: false,
      lastUpdate: Timestamp.fromDate(new Date()),
      createdAt: Timestamp.fromDate(new Date()),
      favoriteForUserUuids: [],
      wayTags: [],
      jobTags: [],
    };
    const wayDTO = await WayService.createWayDTO(DEFAULT_WAY);

    const updatedUser = new UserPreview({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      description: user.description,
      ownWays: [...user.ownWays, wayDTO.uuid],
      favoriteWays: user.favoriteWays,
      mentoringWays: user.mentoringWays,
      createdAt: user.createdAt,
    });

    await UserPreviewDAL.updateUserPreview(updatedUser);

    const way = WayPreviewDAL.getWayPreview(wayDTO.uuid);

    return way;
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
    await WayService.updateWayDTO(wayDTO, wayDTO.uuid);
  }

  /**
   * Updates favorites for user and way.
   */
  public static async updateFavoritesForUserAndWay(
    userUuid: string,
    wayUuid: string,
    updatedFavoriteForUserUuids: string[],
    updatedFavoriteWays: string[],
  ): Promise<void> {
    const batch = writeBatch(db);

    await WayService.updateFavoriteForUserUuidsWithBatch(wayUuid, updatedFavoriteForUserUuids, batch);
    await UserService.updateFavoritesWayUuidsWithBatch(userUuid, updatedFavoriteWays, batch);

    await batch.commit();
  }

}
