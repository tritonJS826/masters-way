import {Timestamp} from "firebase/firestore";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO, WayDTOSchema} from "src/model/DTOModel/WayDTO";

/**
 * WayDTO props
 */
interface WayDTOProps {

  /**
   * @User.uuid
   */
  ownerUuid: string;

  /**
   * @Goal.uuid
   */
  goalUuid: string;

  /**
   * @User.uuids
   */
  mentorsUuids: string[];

  /**
   * @User.uuids
   */
  mentorRequestUuids: string[];

  /**
   * Last day when way was updated in ms
   */
  lastUpdate: Timestamp;

  /**
   * User's uuids @user.uuid for whom this way are favorite
   */
  favoriteForUserUuids: string[];

  /**
   * Date when way was created in ms
   */
  createdAt: Timestamp;
}

/**
 * Convert {@link wayPreview} to {@link WayDTO}
 */
export const wayPreviewToWayDTOConverter = (wayPreview: WayPreview, wayDTOProps: WayDTOProps): WayDTO => {
  const validatedWayDTO = WayDTOSchema.parse({
    uuid: wayPreview.uuid,
    name: wayPreview.name,
    dayReportUuids: wayPreview.dayReportUuids,
    ownerUuid: wayDTOProps.ownerUuid,
    goalUuid: wayDTOProps.goalUuid,
    mentorUuids: wayDTOProps.mentorsUuids,
    mentorRequestUuids: wayDTOProps.mentorRequestUuids,
    isCompleted: wayPreview.isCompleted,
    lastUpdate: wayDTOProps.lastUpdate,
    favoriteForUserUuids: wayDTOProps.favoriteForUserUuids,
    createdAt: wayDTOProps.createdAt,
  });

  return validatedWayDTO;
};