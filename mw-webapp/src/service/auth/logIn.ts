import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "src/firebase";

/**
 * Call method for log in
 */
export const logIn = async () => {
  await signInWithPopup(auth, provider);
};
