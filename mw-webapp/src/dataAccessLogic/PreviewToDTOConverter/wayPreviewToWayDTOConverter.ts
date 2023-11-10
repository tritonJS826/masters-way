import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/DTOModel/WayDTO";

/**
 * WayDTO props
 */
interface WayDTOProps {

  /**
   * @User.uuid
   */
  ownerUuid: string;

  /**
   * @Goal.uuid
   */
  goalUuid: string;

  /**
   * @User.uuids
   */
  currentMentorsUuids: string[];
}

/**
 * Convert {@link wayPreview} to {@link WayDTO}
 */
export const wayPreviewToWayDTOConverter = (wayPreview: WayPreview, wayDTOProps: WayDTOProps): WayDTO => {
  return new WayDTO({
    ...wayPreview,
    dayReportUuids: wayPreview.dayReports,
    monthReportUuids: wayPreview.monthReports,
    ownerUuid: wayDTOProps.ownerUuid,
    goalUuid: wayDTOProps.goalUuid,
    currentMentorUuids: wayDTOProps.currentMentorsUuids,
  });
};