import {Timestamp} from "firebase/firestore";
import {showError} from "src/dataAccessLogic/BusinessToDTOConverter/showError";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayDTO, WayPartialDTOSchema} from "src/model/DTOModel/WayDTO";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Convert {@link way} to {@link WayPartialDTO}
 */
export const wayToWayDTOPartialConverter = (way: PartialWithUuid<Way>): PartialWithUuid<WayDTO> => {
  const wayPartialDTO: PartialWithUuid<WayDTO> = {uuid: way.uuid};

  for (const key in way) {
    switch (key) {
      case "name": {
        wayPartialDTO[key] = way[key];
        break;
      }
      case "dayReports": {
        wayPartialDTO.dayReportUuids = way.dayReports ? way.dayReports.map((dayReport) => dayReport.uuid) : showError(key);
        break;
      }
      case "owner": {
        wayPartialDTO.ownerUuid = way.owner ? way.owner.uuid : showError(key);
        break;
      }
      case "goal": {
        wayPartialDTO.goalUuid = way.goal ? way.goal.uuid : showError(key);
        break;
      }
      case "mentors": {
        wayPartialDTO.mentorUuids = way.mentors ? Array.from(way.mentors.keys()) : showError(key);
        break;
      }
      case "formerMentors": {
        wayPartialDTO.formerMentorUuids = way.formerMentors ? Array.from(way.formerMentors.keys()) : showError(key);
        break;
      }
      case "mentorRequests": {
        wayPartialDTO.mentorRequestUuids = way.mentorRequests
          ? way.mentorRequests.map((mentorRequest: UserPreview) => mentorRequest.uuid)
          : showError(key);
        break;
      }
      case "isCompleted": {
        wayPartialDTO[key] = way[key];
        break;
      }
      case "lastUpdate": {
        wayPartialDTO[key] = way.lastUpdate ? Timestamp.fromDate(way.lastUpdate) : showError(key);
        break;
      }
      case "favoriteForUsers": {
        wayPartialDTO.favoriteForUserUuids = way.favoriteForUsers
          ? way.favoriteForUsers.map((favoriteForUser) => favoriteForUser.uuid)
          : showError(key);
        break;
      }
      case "createdAt": {
        wayPartialDTO[key] = way.createdAt ? Timestamp.fromDate(way.createdAt) : showError(key);
        break;
      }
      case "wayTags": {
        wayPartialDTO[key] = way[key];
        break;
      }
      case "jobTags": {
        wayPartialDTO[key] = way[key];
        break;
      }
    }
  }

  const validatedWayPartialDTO = WayPartialDTOSchema.parse(wayPartialDTO);

  return validatedWayPartialDTO;
};
