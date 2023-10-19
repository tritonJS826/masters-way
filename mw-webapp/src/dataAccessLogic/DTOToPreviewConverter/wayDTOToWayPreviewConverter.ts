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
  currentMentors: UserPreview[];

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
    currentMentors: wayProps.currentMentors,
    dayReports: wayDTO.dayReportUuids,
    monthReports: wayDTO.monthReportUuids,
    goal: wayProps.goal,
  });
};