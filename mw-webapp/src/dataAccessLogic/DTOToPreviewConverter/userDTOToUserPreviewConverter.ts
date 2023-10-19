import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link UserDTO} to {@link UserPreview}
 */
export const UserDTOToUserPreviewConverter = (userDTO: UserDTO): UserPreview => {
  return new UserPreview({...userDTO});
};