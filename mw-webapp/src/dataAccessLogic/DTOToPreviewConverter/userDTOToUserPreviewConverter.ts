import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";

export const UserDTOToUserPreviewConverter =
  (userDTO: UserDTO, ownWays: WayPreview[]) => {
    return new UserPreview({
      ...userDTO,
      ownWays: ownWays,
    });
  };