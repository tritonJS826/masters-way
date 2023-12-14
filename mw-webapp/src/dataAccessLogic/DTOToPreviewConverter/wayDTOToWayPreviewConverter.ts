import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/DTOModel/WayDTO";

/**
 * WayPreview props
 */
interface WayPreviewProps {

  /**
   * Way's creator
   */
  owner: UserPreview;

  /**
   * Way's current mentors
   */
  mentors: UserPreview[];

  /**
   * Users who sent request to become Way's mentor
   */
  mentorRequests: UserPreview[];

  /**
   * Way's goal
   */
  goal: GoalPreview;

  /**
   * Last day when way was updated in ms
   */
  lastUpdate: Date;

  /**
   * Date when way was created in ms
   */
  createdAt: Date;
}

/**
 * Convert {@link WayDTO} to {@link WayPreview}
 */
export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, wayProps: WayPreviewProps): WayPreview => {
  return new WayPreview({
    ...wayDTO,
    uuid: wayDTO.uuid,
    name: wayDTO.name,
    dayReportUuids: wayDTO.dayReportUuids,
    owner: wayProps.owner,
    goal: wayProps.goal,
    mentors: wayProps.mentors,
    mentorRequests: wayProps.mentorRequests,
    isCompleted: wayDTO.isCompleted,
    lastUpdate: wayProps.lastUpdate,
    favoriteForUserUuids: wayDTO.favoriteForUserUuids,
    createdAt: wayProps.createdAt,
  });
};
