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
    mentorRequestUuids: wayPreview.mentorRequests,
    status: wayPreview.status,
    lastUpdate: Timestamp.fromDate(wayPreview.lastUpdate),
    favoriteForUserUuids: wayPreview.favoriteForUserUuids,
    createdAt: Timestamp.fromDate(wayPreview.createdAt),
    wayTagsStringified: wayPreview.wayTags.map((wayTag) => JSON.stringify(wayTag)),
    jobTagsStringified: wayPreview.jobTags.map((jobTag) => JSON.stringify(jobTag)),
    copiedFromWayUuid: wayPreview.copiedFromWayUuid,
    goalDescription: wayPreview.goalDescription,
    estimationTime: wayPreview.estimationTime,
    metricsStringified: wayPreview.metricsStringified,
    isPrivate: wayPreview.isPrivate,
  };

  return WayDTOSchema.parse(wayDTO);
};
