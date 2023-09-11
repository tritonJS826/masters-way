import {ref, set} from "firebase/database";
import {db} from "src/firebase";

interface UserData {
  userId: string;
  userEmail: string | null;
  userName: string | null;
}

export const writeNewUserData = ({userId, userEmail, userName}: UserData) => {
  const usersListRef = ref(db, "/users/" + userId);
  set(usersListRef, {
    uuid: userId,
    email: userEmail,
    name: userName,
  });
};
