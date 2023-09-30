import {signInWithRedirect} from "firebase/auth";
import {auth, provider} from "src/firebase";

export const logIn = async () => {
  await signInWithRedirect(auth, provider);
};
