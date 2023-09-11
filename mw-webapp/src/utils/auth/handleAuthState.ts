import {User, onAuthStateChanged} from "firebase/auth";
import {auth} from "src/firebase";

export const handleUserAuthState = (setUserFunction: React.Dispatch<React.SetStateAction<User | null>>) => {
  onAuthStateChanged(auth, (currentUser) => {
    setUserFunction(currentUser ?? null);
  });
};
