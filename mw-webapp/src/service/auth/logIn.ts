import {signInWithRedirect} from "firebase/auth";
import {auth, provider} from "src/firebase";

/**
 * Log in
 */
export const logIn = async () => {
  await signInWithRedirect(auth, provider);
};
