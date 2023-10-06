import {onAuthStateChanged, User} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {auth, db} from "src/firebase";
import {writeNewUserCredentials} from "src/service/auth/writeNewUserCredentials";

/**
 * Set user state
 * @param {React.Dispatch<React.SetStateAction<User | null>>} setUser
 */
export const handleUserAuthState = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      setUser(null);

      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      writeNewUserCredentials();
    }
    setUser(currentUser);
  });
};
