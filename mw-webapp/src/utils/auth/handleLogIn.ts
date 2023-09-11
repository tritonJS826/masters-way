import {signInWithRedirect} from "firebase/auth";
import {auth, provider} from "src/firebase";

export const handleLogIn = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    alert(errorMessage);
  }
};
