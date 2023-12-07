import {User} from "firebase/auth";
import {Timestamp} from "firebase/firestore";
import {UserService} from "src/service/UserService";

/**
 * Create new user on firebase Users collection after google login
 */
export const writeNewUserCredentials = async (currentUser: User) => {
  if (!currentUser) {
    return;
  }
  UserService.createUserDTO(
    {
      uuid: currentUser.uid,
      email: currentUser.email ?? "example@gmail.com",
      name: currentUser.displayName ?? "Empty name",
      description: "",
      ownWayUuids: [],
      favoriteWayUuids: [],
      mentoringWayUuids: [],
      createdAt: Timestamp.fromDate(new Date()),
    },
  );
};
