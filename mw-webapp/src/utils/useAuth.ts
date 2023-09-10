import {GoogleAuthProvider, getAuth, signInWithRedirect, signOut} from "firebase/auth";
import {set, ref} from "firebase/database";
import {db} from "src/firebase";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const writeNewUserData = (userId: string, email: string | null, name: string | null) => {
    const usersListRef = ref(db, "/users/" + userId);
    set(usersListRef, {
      uuid: userId,
      email: email,
      name: name,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  };

  return {handleGoogleSignIn, handleLogout, writeNewUserData, auth};
};
