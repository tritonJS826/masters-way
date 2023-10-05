import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";

/**
 * Way prps
 */
interface WayProps {
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
 * @param {WayProps} wayProps - {@link WayProps}
 * @returns {WayPreview} {@link WayPreview}
 */
export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, wayProps: WayProps): WayPreview => {
  return new WayPreview({
    ...wayDTO,
    owner: wayProps.owner,
    currentMentors: wayProps.currentMentors,
    dayReports: wayDTO.dayReportUuids,
    monthReports: wayDTO.monthReportUuids,
    goal: wayDTO.goalUuid,
  });
};