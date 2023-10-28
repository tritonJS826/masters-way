import {signOut} from "firebase/auth";
import {auth} from "src/firebase";
import {USER_IS_AUTH, USER_UNREGISTERED} from "src/service/auth/constants";

/**
 * Call method for logout
 */
export const logOut = async () => {
  await signOut(auth);
  localStorage.setItem(USER_IS_AUTH, USER_UNREGISTERED);
};
