import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WAY_JOB_TAGS_FIELD, WAY_TAGS_FIELD, WayDTO} from "src/model/DTOModel/WayDTO";

/**
 * WayPreview props
 */
interface WayPreviewProps {

  /**
   * Way's creator
   */
  owner: UserPreview;

  /**
   * Way's current mentors
   */
  mentors: UserPreview[];

}

/**
 * Convert {@link WayDTO} to {@link WayPreview}
 */
export const wayDTOToWayPreviewConverter = (wayDTO: WayDTO, wayProps: WayPreviewProps): WayPreview => {
  return new WayPreview({
    ...wayDTO,
    owner: wayProps.owner,
    mentors: wayProps.mentors,
    mentorRequests: wayDTO.mentorRequestUuids,
    lastUpdate: wayDTO.lastUpdate.toDate(),
    createdAt: wayDTO.createdAt.toDate(),
    wayTags: wayDTO[WAY_TAGS_FIELD].map((wayTag) => JSON.parse(wayTag)),
    jobTags: wayDTO[WAY_JOB_TAGS_FIELD].map((jobTag) => JSON.parse(jobTag)),
  });
};
