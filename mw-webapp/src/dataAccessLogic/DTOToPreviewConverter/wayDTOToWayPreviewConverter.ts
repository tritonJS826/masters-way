import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/DTOModel/WayDTO";

/**
 * Convert {@link WayDTO} to {@link WayPreview}
 */
export const wayDTOToWayPreviewConverter = async (wayDTO: WayDTO): Promise<WayPreview> => {
  return new WayPreview({
    ...wayDTO,
    dayReportUuids: wayDTO.dayReportUuids,
    owner: await UserPreviewDAL.getUserPreview(wayDTO.ownerUuid),
    goal: await GoalPreviewDAL.getGoalPreview(wayDTO.goalUuid),
    mentors: await Promise.all(wayDTO.mentorUuids.map(UserPreviewDAL.getUserPreview)),
    mentorRequests: await Promise.all(wayDTO.mentorRequestUuids.map(UserPreviewDAL.getUserPreview)),
    lastUpdate: wayDTO.lastUpdate.toDate(),
    createdAt: wayDTO.createdAt.toDate(),
  });
};