import {Timestamp} from "firebase/firestore";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO, WayDTOSchema} from "src/model/DTOModel/WayDTO";

/**
 * Convert {@link wayPreview} to {@link WayDTO}
 */
export const wayPreviewToWayDTOConverter = (wayPreview: WayPreview): WayDTO => {
  const wayDTO: WayDTO = {
    ...wayPreview,
    ownerUuid: wayPreview.owner.uuid,
    goalUuid: wayPreview.goal.uuid,
    mentorRequestUuids: wayPreview.mentorRequests.map((item) => item.uuid),
    mentorUuids: wayPreview.mentors.map((item) => item.uuid),
    lastUpdate: Timestamp.fromDate(wayPreview.lastUpdate),
    createdAt: Timestamp.fromDate(wayPreview.createdAt),
  };

  return WayDTOSchema.parse(wayDTO);
};