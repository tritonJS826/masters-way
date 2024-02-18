import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";
import {UserDTO} from "src/model/DTOModel/UserDTO";

/**
 * Convert {@link UserDTO} to {@link UserPreview}
 */
export const UserDTOToUserPreviewConverter = (userDTO: UserDTO, wayRequests: WayNotSaturatedUser[]): UserPreview => {
  return new UserPreview({
    ...userDTO,
    ownWays: userDTO.ownWayUuids,
    favoriteWays: userDTO.favoriteWayUuids,
    mentoringWays: userDTO.mentoringWayUuids,
    createdAt: userDTO.createdAt.toDate(),
    customWayCollections: userDTO.customWayCollectionsStringified.map((collection) => JSON.parse(collection)),
    favoriteForUserUuids: userDTO.favoriteForUserUuids,
    favoriteUserUuids: userDTO.favoriteUserUuids,
    wayRequests,
    tags: userDTO.tagsStringified.map((tagStringified) => JSON.parse(tagStringified)),
  });
};
