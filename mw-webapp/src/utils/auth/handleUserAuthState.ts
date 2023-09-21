import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "src/firebase";

export const handleUserAuthState = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser ?? null);
  });
};
