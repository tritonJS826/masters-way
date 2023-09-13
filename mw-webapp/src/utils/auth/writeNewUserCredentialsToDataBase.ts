import {getRedirectResult} from "firebase/auth";
import {auth} from "src/firebase";
import {UserService} from "src/service/UserService";

const newUserBlankWays = {
  ownWays: [""],
  favoriteWays: [""],
  mentoringWays: [""],
};

export const writeNewUserCredentialsToDataBase = async () => {
  try {
    const userCredentials = await getRedirectResult(auth);
    if(!userCredentials) {
      return;
    }
    if (userCredentials.user.email && userCredentials.user.displayName) {
      UserService.writeNewUserData(
        {
          uuid: userCredentials.user.uid,
          email: userCredentials.user.email,
          name: userCredentials.user.displayName,
          ...newUserBlankWays,
        },
      );
    }
  } catch (error) {
    alert(error ?? null);
  }
};
