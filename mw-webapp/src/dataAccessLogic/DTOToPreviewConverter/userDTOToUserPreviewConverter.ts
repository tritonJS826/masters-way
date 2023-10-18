import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {UserDTO} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link UserDTO} to {@link UserPreview}
 */
export const UserDTOToUserPreviewConverter = (userDTO: UserDTO, ownWays: WayPreview[]): UserPreview => {
  return new UserPreview({
    ...userDTO,
    ownWays,
    //TODO: need convert uuids to ways
    favoriteWays: userDTO.favoriteWayUuids,
    mentoringWays: userDTO.mentoringWayUuids,
  });
};