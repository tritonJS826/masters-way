import {Timestamp} from "firebase/firestore";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO, WayDTOSchema} from "src/model/DTOModel/WayDTO";

/**
 * Convert {@link wayPreview} to {@link WayDTO}
 */
export const wayPreviewToWayDTOConverter = (wayPreview: WayPreview): WayDTO => {
  const wayDTO: WayDTO = {
    uuid: wayPreview.uuid,
    name: wayPreview.name,
    ownerUuid: wayPreview.owner.uuid,
    mentorUuids: wayPreview.mentors.map((item) => item.uuid),
    formerMentorUuids: wayPreview.formerMentorUuids,
    dayReportUuids: wayPreview.dayReportUuids,
    goalUuid: wayPreview.goal.uuid,
    mentorRequestUuids: wayPreview.mentorRequests.map((item) => item.uuid),
    isCompleted: wayPreview.isCompleted,
    lastUpdate: Timestamp.fromDate(wayPreview.lastUpdate),
    favoriteForUserUuids: wayPreview.favoriteForUserUuids,
    createdAt: Timestamp.fromDate(wayPreview.createdAt),
    wayTags: wayPreview.wayTags,
    jobTags: wayPreview.jobTags,
    copiedFromWayUuid: wayPreview.copiedFromWayUuid,
  };

  return WayDTOSchema.parse(wayDTO);
};
