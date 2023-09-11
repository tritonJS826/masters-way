import {signOut} from "firebase/auth";
import {auth} from "src/firebase";

export const handleLogOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(error ?? null);
  }
};
