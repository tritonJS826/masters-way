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
}

/**
 * Convert {@link WayDTO} to {@link WayPreview}
 */
export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, wayProps: WayPreviewProps): WayPreview => {
  return new WayPreview({
    ...wayDTO,
    owner: wayProps.owner,
    goal: wayProps.goal,
    mentors: wayProps.mentors,
    mentorRequests: wayProps.mentorRequests,
    lastUpdate: wayDTO.lastUpdate.toDate(),
    createdAt: wayDTO.createdAt.toDate(),
  });
};
