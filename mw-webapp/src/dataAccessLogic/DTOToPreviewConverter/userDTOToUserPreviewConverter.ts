import {UserPreview} from "src/model/businessModelPreview/UserPreview";
// Import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {UserDTO} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link UserDTO} to {@link UserPreview}
 */
export const UserDTOToUserPreviewConverter = (userDTO: UserDTO): UserPreview => {
  return new UserPreview({
    ...userDTO,
    ownWays: userDTO.ownWayUuids,
    //TODO: need convert uuids to ways in task #52
    favoriteWays: userDTO.favoriteWayUuids,
    mentoringWays: userDTO.mentoringWayUuids,
  });
};