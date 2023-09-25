import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";

interface WayProps {
  owner: UserPreview;
  currentMentors: UserPreview[];
}

/**
 * Convert WayDTO to WayPreview
 * @param wayDTO
 * @param wayProps
 * @returns WayPreview
 */
export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, wayProps: WayProps) => {
  return new WayPreview({
    ...wayDTO,
    owner: wayProps.owner,
    currentMentors: wayProps.currentMentors,
    dayReports: wayDTO.dayReportUuids,
    monthReports: wayDTO.monthReportUuids,
    goal: wayDTO.goalUuid,
  });
};