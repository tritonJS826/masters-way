import {querySnapshotToDTOConverter} from "src/convertDTOToBusiness/querySnapshotToDTOConverter";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";
import {querySnapshot} from "src/model/querySnapshot";

export const UserDTOToUserPreviewConverter = (usersRaw: querySnapshot) => {
  const usersDTO: UserDTO[] = querySnapshotToDTOConverter<UserDTO>(usersRaw);
  return usersDTO;
};


