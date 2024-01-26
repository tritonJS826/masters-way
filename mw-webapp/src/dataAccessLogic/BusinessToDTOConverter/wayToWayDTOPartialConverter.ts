/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Timestamp} from "firebase/firestore";
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
        wayPartialDTO.dayReportUuids = way[key]!.map((dayReport) => dayReport.uuid);
        break;
      }
      case "owner": {
        wayPartialDTO.ownerUuid = way[key]!.uuid;
        break;
      }
      case "goal": {
        wayPartialDTO.goalUuid = way[key]!.uuid;
        break;
      }
      case "mentors": {
        wayPartialDTO.mentorUuids = Array.from(way[key]!.keys());
        break;
      }
      case "formerMentors": {
        wayPartialDTO.formerMentorUuids = Array.from(way[key]!.keys());
        break;
      }
      case "mentorRequests": {
        wayPartialDTO.mentorRequestUuids = way[key]!.map((mentorRequest: UserPreview) => mentorRequest.uuid);
        break;
      }
      case "isCompleted": {
        wayPartialDTO[key] = way[key];
        break;
      }
      case "lastUpdate": {
        wayPartialDTO[key] = Timestamp.fromDate(way[key]!);
        break;
      }
      case "favoriteForUsers": {
        wayPartialDTO.favoriteForUserUuids = way[key]!.map((favoriteForUser) => favoriteForUser.uuid);
        break;
      }
      case "createdAt": {
        wayPartialDTO[key] = Timestamp.fromDate(way[key]!);
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
