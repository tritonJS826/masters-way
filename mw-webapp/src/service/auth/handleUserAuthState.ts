import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {auth, db} from "src/firebase";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {writeNewUserCredentials} from "src/service/auth/writeNewUserCredentials";

/**
 * Tracks whether the user is logged in or not
 */
export const handleUserAuthState = (setUser: React.Dispatch<React.SetStateAction<UserPreview | null>>) => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      setUser(null);

      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      await writeNewUserCredentials(currentUser);
    }

    const currentUserPreview = await UserPreviewDAL.getUserPreview(currentUser.uid);
    setUser(currentUserPreview);
  });
};
