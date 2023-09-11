import {ref, set} from "firebase/database";
import {db} from "src/firebase";

interface UserData {
  userId: string;
  userEmail: string | null;
  userName: string | null;
}

export const writeNewUserData = (params: UserData) => {
  const usersListRef = ref(db, "/users/" + params.userId);
  set(usersListRef, {
    uuid: params.userId,
    email: params.userEmail,
    name: params.userName,
  });
};
