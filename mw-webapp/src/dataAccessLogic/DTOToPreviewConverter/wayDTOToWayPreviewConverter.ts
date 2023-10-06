import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";

/**
 * WayPreview props {@link WayPreview} that have custom type
 */
interface WayPreviewProps {

  /**
   * Owner
   */
  owner: UserPreview;

  /**
   * Current mentors
   */
  currentMentors: UserPreview[];
}

/**
 * Convert {@link WayDTO} to {@link WayPreview}
 * @param {WayDTO} wayDTO
 * @param {WayPreviewProps} wayProps - {@link WayPreviewProps}
 * @returns {WayPreview} {@link WayPreview}
 */
export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, wayProps: WayPreviewProps): WayPreview => {
  return new WayPreview({
    ...wayDTO,
    owner: wayProps.owner,
    currentMentors: wayProps.currentMentors,
    dayReports: wayDTO.dayReportUuids,
    monthReports: wayDTO.monthReportUuids,
    goal: wayDTO.goalUuid,
  });
};