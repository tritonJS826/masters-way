import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {GOAL_UUID_FIELD} from "src/model/DTOModel/GoalDTO";
import {USER_UUID_FIELD} from "src/model/DTOModel/UserDTO";
import {WAY_OWNER_UUID_FIELD} from "src/model/DTOModel/WayDTO";
import {WayService} from "src/service/WayService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";

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

    const usersHashmap = arrayToHashMap({keyField: USER_UUID_FIELD, list: allNeededUsersPreview});
    const goalsHashMap = arrayToHashMap({keyField: GOAL_UUID_FIELD, list: allNeededGoalsPreview});

    const usersSafeHashmap = new SafeMap(usersHashmap);
    const goalsSafeHashMap = new SafeMap(goalsHashMap);

    const waysPreview = waysDTO.map((wayDTO) => {
      const owner = usersSafeHashmap.getValue(wayDTO[WAY_OWNER_UUID_FIELD]);
      const mentors = wayDTO.mentorUuids.map((item) => usersSafeHashmap.getValue(item));
      const mentorRequests = wayDTO.mentorRequestUuids.map((item) => usersSafeHashmap.getValue(item));
      const goal = goalsSafeHashMap.getValue(wayDTO.goalUuid);

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

    const usersHashmap = arrayToHashMap({keyField: USER_UUID_FIELD, list: allNeededUsersPreview});
    const goalsHashMap = arrayToHashMap({keyField: GOAL_UUID_FIELD, list: allNeededGoalsPreview});

    const usersSafeHashmap = new SafeMap(usersHashmap);
    const goalsSafeHashMap = new SafeMap(goalsHashMap);

    const waysPreview = waysDTO.map((wayDTO) => {
      const owner = usersSafeHashmap.getValue(wayDTO.ownerUuid);
      const mentors = wayDTO.mentorUuids.map((mentorUuid) => usersSafeHashmap.getValue(mentorUuid));
      const mentorRequests = wayDTO.mentorRequestUuids.map((mentorRequestUuid) => usersSafeHashmap.getValue(mentorRequestUuid));
      const goal = goalsSafeHashMap.getValue(wayDTO.goalUuid);

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

}
