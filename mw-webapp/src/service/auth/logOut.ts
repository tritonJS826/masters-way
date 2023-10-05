import {signOut} from "firebase/auth";
import {auth} from "src/firebase";

/**
 * Log out
 */
export const logOut = async () => {
  await signOut(auth);
};
