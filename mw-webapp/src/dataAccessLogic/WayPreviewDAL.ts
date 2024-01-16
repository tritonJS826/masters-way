import {CustomHashMap} from "src/dataAccessLogic/customHashMap";
import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {wayPreviewToWayDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/wayPreviewToWayDTOConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WAY_OWNER_UUID_FIELD} from "src/model/DTOModel/WayDTO";
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

    const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
      wayDTO.ownerUuid,
      ...wayDTO.mentorUuids,
      ...wayDTO.mentorRequestUuids,
    ]));

    const allNeededGoalsUuids = waysDTO.map(wayDTO => wayDTO.goalUuid);

    const allNeededUsersPreviewPromise = UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));
    const allNeededGoalsPreviewPromise = GoalPreviewDAL.getGoalsPreviewByUuids(Array.from(allNeededGoalsUuids));

    const [
      allNeededUsersPreview,
      allNeededGoalsPreview,
    ] = await Promise.all([
      allNeededUsersPreviewPromise,
      allNeededGoalsPreviewPromise,
    ]);

    const usersHashmap = new CustomHashMap<UserPreview>(allNeededUsersPreview);
    const goalsHashMap = new CustomHashMap<GoalPreview>(allNeededGoalsPreview);

    const waysPreview = waysDTO.map((wayDTO) => {
      const owner = usersHashmap.getValue(wayDTO[WAY_OWNER_UUID_FIELD]);
      const mentors = wayDTO.mentorUuids.map((item) => usersHashmap.getValue(item));
      const mentorRequests = wayDTO.mentorRequestUuids.map((item) => usersHashmap.getValue(item));
      const goal = goalsHashMap.getValue(wayDTO.goalUuid);

      const wayPreviewProps = {
        owner,
        mentors,
        mentorRequests,
        goal,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
    });

    return waysPreview;
  }

  /**
   * Get WaysPreview by uuid
   */
  public static async getWaysPreviewByUuids(wayUuids: string[]): Promise<WayPreview[]> {
    const waysDTO = wayUuids.length ? await WayService.getWaysDTOByUuids(wayUuids) : [];

    const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
      wayDTO.ownerUuid,
      ...wayDTO.mentorUuids,
      ...wayDTO.mentorRequestUuids,
    ]));

    const allNeededGoalsUuids = waysDTO.map(wayDTO => wayDTO.goalUuid);

    const allNeededUsersPreviewPromise = UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));
    const allNeededGoalsPreviewPromise = GoalPreviewDAL.getGoalsPreviewByUuids(Array.from(allNeededGoalsUuids));

    const [
      allNeededUsersPreview,
      allNeededGoalsPreview,
    ] = await Promise.all([
      allNeededUsersPreviewPromise,
      allNeededGoalsPreviewPromise,
    ]);

    const usersHashmap = new CustomHashMap<UserPreview>(allNeededUsersPreview);
    const goalsHashMap = new CustomHashMap<GoalPreview>(allNeededGoalsPreview);

    const waysPreview = waysDTO.map((wayDTO) => {
      const owner = usersHashmap.getValue(wayDTO.ownerUuid);
      const mentors = wayDTO.mentorUuids.map((mentorUuid) => usersHashmap.getValue(mentorUuid));
      const mentorRequests = wayDTO.mentorRequestUuids.map((mentorRequestUuid) => usersHashmap.getValue(mentorRequestUuid));
      const goal = goalsHashMap.getValue(wayDTO.goalUuid);

      const wayPreviewProps = {
        owner,
        mentors,
        mentorRequests,
        goal,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
    });

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
