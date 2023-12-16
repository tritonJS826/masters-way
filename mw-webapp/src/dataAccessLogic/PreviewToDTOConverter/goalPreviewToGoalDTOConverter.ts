import {Timestamp} from "firebase/firestore";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO, UserDTOSchema} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link userPreview} to {@link UserDTO}
 */
export const goalPreviewToGoalDTOConverter = (userPreview: UserPreview): UserDTO => {
  const validatedUserDTO = UserDTOSchema.parse({
    uuid: userPreview.uuid,
    name: userPreview.name,
    email: userPreview.email,
    description: userPreview.description,
    ownWayUuids: userPreview.ownWays,
    favoriteWayUuids: userPreview.favoriteWays,
    mentoringWayUuids: userPreview.mentoringWays,
    createdAt: Timestamp.fromDate(userPreview.createdAt),
  });

  return validatedUserDTO;
};
