import {signOut} from "firebase/auth";
import {auth} from "src/firebase";

/**
 * LCall firebase's method for logout
 */
export const logOut = async () => {
  await signOut(auth);
};
