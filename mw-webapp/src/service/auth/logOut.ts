import {signOut} from "firebase/auth";
import {auth} from "src/firebase";

export const logOut = async () => {
  await signOut(auth);
};
