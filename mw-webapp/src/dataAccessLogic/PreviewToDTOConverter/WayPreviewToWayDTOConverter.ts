import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO, WayDTOSchema} from "src/model/DTOModel/WayDTO";

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
  return WayDTOSchema.parse({
    uuid: wayPreview.uuid,
    name: wayPreview.name,
    dayReportUuids: wayPreview.dayReports,
    monthReportUuids: wayPreview.monthReports,
    ownerUuid: wayDTOProps.ownerUuid,
    goalUuid: wayDTOProps.goalUuid,
    currentMentorUuids: wayDTOProps.currentMentorsUuids,
    isCompleted: wayPreview.isCompleted,
  });
};