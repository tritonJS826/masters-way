import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link userPreview} to {@link UserDTO}
 */
export const userPreviewToUserDTOConverter = (userPreview: UserPreview): UserDTO => {
  return new UserDTO({
    ...userPreview,
    ownWayUuids: userPreview.ownWays,
    favoriteWayUuids: userPreview.favoriteWays,
    mentoringWayUuids: userPreview.mentoringWays,
  });
};