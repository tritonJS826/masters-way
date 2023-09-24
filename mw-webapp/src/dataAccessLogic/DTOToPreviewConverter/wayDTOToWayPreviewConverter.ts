import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";

export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, owner: UserPreview, currentMentors: UserPreview[]) => {
  return new WayPreview({
    ...wayDTO,
    owner: owner,
    currentMentors: currentMentors,
    dayReports: wayDTO.dayReportUuids,
    monthReports: wayDTO.monthReportUuids,
    goal: wayDTO.goalUuid,
  });
};