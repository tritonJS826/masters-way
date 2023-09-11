import {signOut} from "firebase/auth";
import {auth} from "src/firebase";

export const handleLogOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    alert(errorMessage);
  }
};
