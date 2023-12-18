import {Timestamp} from "firebase/firestore";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO, UserDTOSchema} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link userPreview} to {@link UserDTO}
 */
export const userPreviewToUserDTOConverter = (userPreview: UserPreview): UserDTO => {
  const userDTO: UserDTO = {
    uuid: userPreview.uuid,
    name: userPreview.name,
    email: userPreview.email,
    description: userPreview.description,
    ownWayUuids: userPreview.ownWays,
    favoriteWayUuids: userPreview.favoriteWays,
    mentoringWayUuids: userPreview.mentoringWays,
    createdAt: Timestamp.fromDate(userPreview.createdAt),
  };

  return UserDTOSchema.parse(userDTO);
};
