import {UserPlain} from "src/model/businessModel/User";
import {UserPreviewShort} from "src/model/businessModelPreview/UserPreviewShort";

/**
 * Convert {@link UserDTO} to {@link UserPreview}
 */
export const UserPlainToUserPreviewShortConverter = (userPlain: UserPlain): UserPreviewShort => {
  return new UserPreviewShort({
    ...userPlain,
    createdAt: new Date(userPlain.createdAt),
    imageUrl: userPlain.imageUrl ?? "",
  });
};
