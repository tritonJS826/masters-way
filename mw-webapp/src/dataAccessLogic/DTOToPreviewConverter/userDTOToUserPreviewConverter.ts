import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link UserDTO} to {@link UserPreview}
 */
export const UserDTOToUserPreviewConverter = (userDTO: UserDTO): UserPreview => {
  return new UserPreview({
    uuid: userDTO.uuid,
    name: userDTO.name,
    email: userDTO.email,
    description: userDTO.description,
    ownWays: userDTO.ownWayUuids,
    favoriteWays: userDTO.favoriteWayUuids,
    mentoringWays: userDTO.mentoringWayUuids,
    createdAt: userDTO.createdAt.toDate(),
  });
};