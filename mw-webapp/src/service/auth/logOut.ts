import {signOut} from "firebase/auth";
import {auth} from "src/firebase";

/**
 * Call method for logout
 */
export const logOut = async () => {
  await signOut(auth);
};
