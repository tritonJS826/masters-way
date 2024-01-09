import {wayDTOToWayPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/wayDTOToWayPreviewConverter";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {wayPreviewToWayDTOConverter} from "src/dataAccessLogic/PreviewToDTOConverter/wayPreviewToWayDTOConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
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

    const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
      wayDTO.ownerUuid,
      ...wayDTO.mentorUuids,
      ...wayDTO.mentorRequestUuids,
    ]));

    const allNeededGoalsUuids = new Set(waysDTO.flatMap(wayDTO => [wayDTO.goalUuid]));

    const allNeededUsersPreview = await UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));

    const allNeededGoalsPreview = await GoalPreviewDAL.getGoalsPreviewByUuids(Array.from(allNeededGoalsUuids));

    const waysPreview = await Promise.all(waysDTO.map(async (wayDTO) => {
      const owner = allNeededUsersPreview.find(user => user.uuid === wayDTO.ownerUuid);
      const mentors = wayDTO.mentorUuids.map(uuid => allNeededUsersPreview.find(user => user.uuid === uuid));
      const mentorRequests = wayDTO.mentorRequestUuids.map(uuid => allNeededUsersPreview.find(user => user.uuid === uuid));
      const wayGoal = allNeededGoalsPreview.find(goal => goal.uuid === wayDTO.goalUuid);

      if (!owner) {
        throw new Error(`Owner not found for UUID: ${wayDTO.ownerUuid}, WayUuid: ${wayDTO.uuid}`);
      }

      if (mentors.some(mentor => mentor === undefined)) {
        throw new Error(`One or more mentors not found for UUIDs: ${wayDTO.mentorUuids}, WayUuid: ${wayDTO.uuid}`);
      }

      if (mentorRequests.some(request => request === undefined)) {
        throw new Error(`One or more mentor requests not found for UUIDs: ${wayDTO.mentorRequestUuids}, WayUuid: ${wayDTO.uuid}`);
      }

      if (!wayGoal) {
        throw new Error(`Goal not found for UUID: ${wayDTO.goalUuid}, WayUuid: ${wayDTO.uuid}`);
      }

      const wayPreviewProps = {
        owner,
        mentors: mentors as UserPreview[],
        mentorRequests: mentors as UserPreview[],
        goal: wayGoal as GoalPreview,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
    }));

    return waysPreview;
  }

  /**
   * Get WaysPreview by uuid
   */
  public static async getWaysPreviewByUuids(wayUuids: string[]): Promise<WayPreview[]> {
    const waysDTO = wayUuids.length !== 0 ? await WayService.getWaysDTOByUuids(wayUuids) : [];

    const allNeededUsersUuids = new Set(waysDTO.flatMap(wayDTO => [
      wayDTO.ownerUuid,
      ...wayDTO.mentorUuids,
      ...wayDTO.mentorRequestUuids,
    ]));

    const allNeededGoalsUuids = new Set(waysDTO.flatMap(wayDTO => [wayDTO.goalUuid]));

    const allNeededUsersPreview = await UserPreviewDAL.getUsersPreviewByUuids(Array.from(allNeededUsersUuids));

    const allNeededGoalsPreview = await GoalPreviewDAL.getGoalsPreviewByUuids(Array.from(allNeededGoalsUuids));

    const waysPreview = await Promise.all(waysDTO.map(async (wayDTO) => {
      const owner = allNeededUsersPreview.find(user => user.uuid === wayDTO.ownerUuid);
      const mentors = wayDTO.mentorUuids.map(uuid => allNeededUsersPreview.find(user => user.uuid === uuid));
      const mentorRequests = wayDTO.mentorRequestUuids.map(uuid => allNeededUsersPreview.find(user => user.uuid === uuid));
      const wayGoal = allNeededGoalsPreview.find(goal => goal.uuid === wayDTO.goalUuid);

      if (!owner) {
        throw new Error(`Owner not found for UUID: ${wayDTO.ownerUuid}, WayUuid: ${wayDTO.uuid}`);
      }

      if (mentors.some(mentor => mentor === undefined)) {
        throw new Error(`One or more mentors not found for UUIDs: ${wayDTO.mentorUuids}, WayUuid: ${wayDTO.uuid}`);
      }

      if (mentorRequests.some(request => request === undefined)) {
        throw new Error(`One or more mentor requests not found for UUIDs: ${wayDTO.mentorRequestUuids}, WayUuid: ${wayDTO.uuid}`);
      }

      if (!wayGoal) {
        throw new Error(`Goal not found for UUID: ${wayDTO.goalUuid}, WayUuid: ${wayDTO.uuid}`);
      }

      const wayPreviewProps = {
        owner,
        mentors: mentors as UserPreview[],
        mentorRequests: mentors as UserPreview[],
        goal: wayGoal as GoalPreview,
      };

      return wayDTOToWayPreviewConverter(wayDTO, wayPreviewProps);
    }));

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
