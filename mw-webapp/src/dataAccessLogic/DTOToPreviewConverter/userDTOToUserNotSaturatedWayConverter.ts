import {SchemasUserPlainResponseWithInfo} from "src/apiAutogenerated/general";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";

/**
 * Convert {@link UserDTO} to {@link UserNotSaturatedWay}
 */
export const userDTOToUserNotSaturatedWayConverter = (userDTO: SchemasUserPlainResponseWithInfo): UserNotSaturatedWay => {
  return new UserNotSaturatedWay({
    ...userDTO,
    createdAt: new Date(userDTO.createdAt),
  });
};
