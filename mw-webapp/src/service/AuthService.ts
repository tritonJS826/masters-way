import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {doc, getDoc, Timestamp} from "firebase/firestore";
import {auth, db, provider} from "src/firebase";
import {UserService} from "src/service/UserService";

/**
 * Provides methods to interact with the Comments collection
 */
export class AuthService {

  /**
   * Call method for log in
   */
  public static async logIn() {

    /**
     * TODO:
     * Сheck how it works in browsers: Edge, Safari
     * Using signInWithRedirect works in Chrome but doesn't work in FireFox and maybe other browsers
     * Using signInWithPopUp works in FireFox but calls in Chrome and Opera Error:
     * "Cross-Origin-Opener-Policy policy would block the window.closed call."
     * Link on discuss about this problem: https://github.com/vercel/next.js/discussions/51135
     * Resolve solutions:
     * https://firebase.google.com/docs/auth/web/redirect-best-practices
     */
    await signInWithPopup(auth, provider);
  }

  /**
   * Call method for logout
   */
  public static async logOut() {
    await signOut(auth);
  }

  /**
   * Tracks whether the user is logged in or not
   */
  public static async listenAuthStateChange(onLogIn: (userUid: string) => void, onLogOut: (user: null) => void) {
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        onLogOut(null);

        return;
      }

      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        if (!currentUser.email) {
          throw Error ("Current user doesn't have an email");
        }
        // Create new user on firebase Users collection after google login
        UserService.createUserDTO(
          {
            uuid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName ?? "Current user doesn't have a name",
            description: "",
            ownWayUuids: [],
            favoriteWayUuids: [],
            mentoringWayUuids: [],
            createdAt: Timestamp.fromDate(new Date()),
          },
        );
      }

      onLogIn(currentUser.uid);

    });
  }

}