/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Timestamp} from "firebase/firestore";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO, UserPartialDTOSchema} from "src/model/DTOModel/UserDTO";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Convert {@link user} to {@link UserPartialDTO}
 */
export const userToUserDTOPartialConverter = (user: PartialWithUuid<UserPreview>): PartialWithUuid<UserDTO> => {
  const userPartialDTO: PartialWithUuid<UserDTO> = {uuid: user.uuid};

  for (const key in user) {
    switch (key) {
      case "name": {
        userPartialDTO[key] = user[key];
        break;
      }
      case "email": {
        userPartialDTO[key] = user[key];
        break;
      }
      case "description": {
        userPartialDTO[key] = user[key];
        break;
      }
      case "ownWays": {
        userPartialDTO.ownWayUuids = user[key];
        break;
      }
      case "favoriteWays": {
        userPartialDTO.favoriteWayUuids = user[key];
        break;
      }
      case "mentoringWays": {
        userPartialDTO.mentoringWayUuids = user[key];
        break;
      }
      case "createdAt": {
        userPartialDTO[key] = Timestamp.fromDate(user[key]!);
        break;
      }
    }
  }

  const validatedUserPartialDTO = UserPartialDTOSchema.parse(userPartialDTO);

  return validatedUserPartialDTO;
};
