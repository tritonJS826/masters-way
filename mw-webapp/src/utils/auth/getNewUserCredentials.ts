import {getRedirectResult} from "firebase/auth";
import {NavigateFunction} from "react-router-dom";
import {writeNewUserData} from "src/utils/auth/writeNewUserData";
import {auth} from "src/firebase";

export const getNewUserCredentials = async (navigateFunction: NavigateFunction, navigateDestination: string) => {
  try {
    const userCredentials = await getRedirectResult(auth);
    if (userCredentials) {
      writeNewUserData(
        {userId: userCredentials.user.uid, userEmail: userCredentials.user.email, userName: userCredentials.user.displayName},
      );
      navigateFunction(navigateDestination);
    } else {
      return;
    }
  } catch (error) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    alert(errorMessage);
  }
};
