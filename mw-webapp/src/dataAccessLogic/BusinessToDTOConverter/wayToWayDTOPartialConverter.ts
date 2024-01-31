import {Timestamp} from "firebase/firestore";
import {deleteUndefinedFields} from "src/dataAccessLogic/BusinessToDTOConverter/deleteUndefinedFields";
import {Way} from "src/model/businessModel/Way";
import {WayDTO, WayPartialDTOSchema} from "src/model/DTOModel/WayDTO";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Convert {@link way} to {@link WayPartialDTO}
 */
export const wayToWayDTOPartialConverter = (way: PartialWithUuid<Way>): PartialWithUuid<WayDTO> => {
  const wayPartialDTO: PartialWithUuid<WayDTO> = {
    uuid: way.uuid,
    name: way.name,
    dayReportUuids: way.dayReports ? way.dayReports.map((dayReport) => dayReport.uuid) : undefined,
    ownerUuid: way.owner ? way.owner.uuid : undefined,
    goalUuid: way.goal ? way.goal.uuid : undefined,
    mentorUuids: way.mentors ? Array.from(way.mentors.keys()) : undefined,
    formerMentorUuids: way.formerMentors ? Array.from(way.formerMentors.keys()) : undefined,
    mentorRequestUuids: way.mentorRequests ? way.mentorRequests.map((mentorRequestUuid) => mentorRequestUuid.uuid) : undefined,
    isCompleted: way.isCompleted,
    lastUpdate: way.lastUpdate ? Timestamp.fromDate(way.lastUpdate) : undefined,
    favoriteForUserUuids: way.favoriteForUserUuids ? way.favoriteForUserUuids : undefined,
    createdAt: way.createdAt ? Timestamp.fromDate(way.createdAt) : undefined,
    wayTags: way.wayTags,
    jobTags: way.jobTags,
    copiedFromWayUuid: way.copiedFromWayUuid,
  };

  const preparedWayPartialDTO = deleteUndefinedFields(wayPartialDTO);

  const validatedWayPartialDTO = WayPartialDTOSchema.parse(preparedWayPartialDTO);

  return validatedWayPartialDTO;
};
