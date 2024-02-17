import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";
import {WAY_CREATED_AT_FIELD, WAY_LAST_UPDATE_FIELD, WAY_MENTOR_UUIDS_FIELD, WayDTO} from "src/model/DTOModel/WayDTO";

/**
 * Convert {@link WayDTO} to {@link WayPreview}
 */
export const wayDTOToWayNotSaturatedUserConverter = (wayDTO: WayDTO, owner: UserNotSaturatedWay): WayNotSaturatedUser => {
  return new WayNotSaturatedUser({
    ...wayDTO,
    owner,
    mentors: wayDTO[WAY_MENTOR_UUIDS_FIELD],
    mentorRequests: wayDTO.mentorRequestUuids,
    createdAt: wayDTO[WAY_CREATED_AT_FIELD].toDate(),
    lastUpdate: wayDTO[WAY_LAST_UPDATE_FIELD].toDate(),
  });
};
