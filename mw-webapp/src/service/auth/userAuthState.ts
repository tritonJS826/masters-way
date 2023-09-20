import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "src/firebase";

export const userAuthState = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser ?? null);
  });
};
