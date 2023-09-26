import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";

/**
 * Convert UserDTO to UserPreview
 * @param {USerDTO} userDTO
 * @param {WayPreview[]} ownWays
 * @returns {UserPreview}
 */
export const UserDTOToUserPreviewConverter = (userDTO: UserDTO, ownWays: WayPreview[]): UserPreview => {
  return new UserPreview({
    ...userDTO,
    ownWays,
  });
};