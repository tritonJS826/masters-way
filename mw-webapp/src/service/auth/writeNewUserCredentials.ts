import {User} from "firebase/auth";
import {UserService} from "src/service/UserService";

/**
 * Create new user on firebase Users collection after google login
 */
export const writeNewUserCredentials = async (currentUser: User) => {
  if (!currentUser) {
    return;
  }
  if (currentUser.email && currentUser.displayName) {
    UserService.createUserDTO(
      {
        uuid: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName,
        description: "",
        ownWayUuids: [],
        favoriteWayUuids: [],
        mentoringWayUuids: [],
      },
    );
  }
};
