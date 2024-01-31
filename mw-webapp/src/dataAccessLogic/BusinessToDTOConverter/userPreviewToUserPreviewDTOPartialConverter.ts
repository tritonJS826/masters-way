import {Timestamp} from "firebase/firestore";
import {deleteUndefinedFields} from "src/dataAccessLogic/BusinessToDTOConverter/deleteUndefinedFields";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO, UserPartialDTOSchema} from "src/model/DTOModel/UserDTO";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Convert {@link user} to {@link UserPartialDTO}
 */
export const userToUserDTOPartialConverter = (user: PartialWithUuid<UserPreview>): PartialWithUuid<UserDTO> => {
  const userPartialDTO: PartialWithUuid<UserDTO> = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    description: user.description,
    ownWayUuids: user.ownWays,
    favoriteWayUuids: user.favoriteWays,
    mentoringWayUuids: user.mentoringWays,
    createdAt: user.createdAt ? Timestamp.fromDate(user.createdAt) : undefined,
    customWayCollectionsStringified: user.customWayCollections
      ? user.customWayCollections.map((collection) => JSON.stringify(collection))
      : undefined,
    favoriteForUserUuids: user.favoriteForUserUuids,
    favoriteUserUuids: user.favoriteUserUuids,
  };

  const preparedUserPartialDTO = deleteUndefinedFields(userPartialDTO);

  const validatedUserPartialDTO = UserPartialDTOSchema.parse(preparedUserPartialDTO);

  return validatedUserPartialDTO;
};
