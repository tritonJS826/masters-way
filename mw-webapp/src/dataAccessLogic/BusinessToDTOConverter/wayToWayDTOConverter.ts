import {Timestamp} from "firebase/firestore";
import {Way} from "src/model/businessModel/Way";
import {WayDTO, WayDTOSchema} from "src/model/DTOModel/WayDTO";

/**
 * Convert {@link WayDTO} to {@link Way}
 */
export const wayToWayDTOConverter = (way: Way): WayDTO => {
  const wayDTO: WayDTO = {
    uuid: way.uuid,
    name: way.name,
    dayReportUuids: way.dayReports.map((dayReport) => dayReport.uuid),
    ownerUuid: way.owner.uuid,
    mentorUuids: Array.from(way.mentors.keys()),
    formerMentorUuids: [],
    mentorRequestUuids: way.mentorRequests.map((mentorRequestUuid) => mentorRequestUuid.uuid),
    status: way.status,
    lastUpdate: Timestamp.fromDate(way.lastUpdate),
    favoriteForUserUuids: way.favoriteForUserUuids,
    createdAt: Timestamp.fromDate(way.createdAt),
    wayTagsStringified: way.wayTags.map((wayTag) => JSON.stringify(wayTag)),
    jobTagsStringified: way.jobTags.map((jobTag) => JSON.stringify(jobTag)),
    copiedFromWayUuid: way.copiedFromWayUuid ?? "",
    goalDescription: way.goalDescription,
    metricsStringified: way.metrics.map((metric) => JSON.stringify(metric)),
    estimationTime: way.estimationTime,
    isPrivate: way.isPrivate,
  };

  const validatedWayDTO = WayDTOSchema.parse(wayDTO);

  return validatedWayDTO;
};
