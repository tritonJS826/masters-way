import {getRedirectResult} from "firebase/auth";
import {auth} from "src/firebase";
import {UserService} from "src/service/UserService";

/**
 * Write new use credentials
 */
export const writeNewUserCredentials = async () => {
  const userCredentials = await getRedirectResult(auth);
  if(!userCredentials) {
    return;
  }
  if (userCredentials.user.email && userCredentials.user.displayName) {
    UserService.createUserDTO(
      {
        uuid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name: userCredentials.user.displayName,
        ownWays: [""],
        favoriteWays: [""],
        mentoringWays: [""],
      },
    );
  }
};
