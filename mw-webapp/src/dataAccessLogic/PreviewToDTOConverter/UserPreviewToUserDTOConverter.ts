import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO, UserDTOSchema} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link userPreview} to {@link UserDTO}
 */
export const userPreviewToUserDTOConverter = (userPreview: UserPreview): UserDTO => {
  return UserDTOSchema.parse({
    uuid: userPreview.uuid,
    name: userPreview.name,
    email: userPreview.email,
    ownWayUuids: userPreview.ownWays,
    favoriteWayUuids: userPreview.favoriteWays,
    mentoringWayUuids: userPreview.mentoringWays,
  });
};