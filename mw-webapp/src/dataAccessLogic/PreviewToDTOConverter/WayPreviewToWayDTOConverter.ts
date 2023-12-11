import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayDTO, WayDTOSchema} from "src/model/DTOModel/WayDTO";

export type WayDTOProps = Pick<WayDTO,
"ownerUuid" | "goalUuid" | "mentorRequestUuids" | "mentorUuids" | "lastUpdate" | "createdAt"
>

/**
 * Convert {@link wayPreview} to {@link WayDTO}
 */
export const wayPreviewToWayDTOConverter = (wayPreview: WayPreview, wayDTOProps: WayDTOProps): WayDTO => {
  const wayDTO: WayDTO = {
    uuid: wayPreview.uuid,
    name: wayPreview.name,
    dayReportUuids: wayPreview.dayReportUuids,
    isCompleted: wayPreview.isCompleted,
    favoriteForUserUuids: wayPreview.favoriteForUserUuids,
    wayTags: wayPreview.wayTags,
    jobTags: wayPreview.jobTags,
    ...wayDTOProps,
  };

  return WayDTOSchema.parse(wayDTO);
};