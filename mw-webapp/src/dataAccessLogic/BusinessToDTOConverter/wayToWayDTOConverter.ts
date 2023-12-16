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
    goalUuid: way.goal.uuid,
    mentorUuids: way.mentors.map((mentor) => mentor.uuid),
    mentorRequestUuids: way.mentorRequests.map((mentorRequestUuid) => mentorRequestUuid.uuid),
    isCompleted: way.isCompleted,
    lastUpdate: Timestamp.fromDate(way.lastUpdate),
    favoriteForUserUuids: way.favoriteForUsers.map((favoriteForUser) => favoriteForUser.uuid),
    createdAt: Timestamp.fromDate(way.createdAt),
    wayTags: way.wayTags,
    jobTags: way.jobTags,
  };

  const validatedWayDTO = WayDTOSchema.parse(wayDTO);

  return validatedWayDTO;
};
