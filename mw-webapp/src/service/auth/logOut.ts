import {signOut} from "firebase/auth";
import {auth} from "src/firebase";
import {USER_IS_AUTH, USER_UNAUTHORIZATION} from "src/service/auth/keysStorage";

/**
 * Call method for logout
 */
export const logOut = async () => {
  await signOut(auth);
  localStorage.setItem(USER_IS_AUTH, USER_UNAUTHORIZATION);
};
