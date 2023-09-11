import {getRedirectResult} from "firebase/auth";
import {writeNewUserData} from "src/utils/auth/writeNewUserData";
import {auth} from "src/firebase";

export const getNewUserCredentials = async () => {
  try {
    const userCredentials = await getRedirectResult(auth);
    if (userCredentials) {
      writeNewUserData(
        {userId: userCredentials.user.uid, userEmail: userCredentials.user.email, userName: userCredentials.user.displayName},
      );
    } else {
      return;
    }
  } catch (error) {
    alert(error ?? null);
  }
};
