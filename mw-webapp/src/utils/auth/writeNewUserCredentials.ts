import {getRedirectResult} from "firebase/auth";
import {auth} from "src/firebase";
import {UserService} from "src/service/UserService";

export const writeNewUserCredentials = async () => {
  try {
    const userCredentials = await getRedirectResult(auth);
    if(!userCredentials) {
      return;
    }
    if (userCredentials.user.email && userCredentials.user.displayName) {
      UserService.createUser(
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
  } catch (error) {
    alert(error ?? null);
  }
};
