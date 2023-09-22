import {querySnapshot} from "src/converter/querySnapshot";
import {User as UserDTO} from "src/model/firebaseCollection/User";

export const querySnapshotToUserDTOConverter = (usersRaw: querySnapshot) => {
  const users: UserDTO[] = usersRaw.docs.map((userRaw) => ({
    name: userRaw.data().name,
    email: userRaw.data().email,
    uuid: userRaw.data().uuid,
    ownWays: userRaw.data().ownWays,
    mentoringWays: userRaw.data().mentoringWays,
    favoriteWays: userRaw.data().favoriteWays,
  }));
  return users;
};
