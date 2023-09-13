import {ref, onValue, set} from "firebase/database";
import {db} from "src/firebase";
import {User as UserDTO} from "src/model/firebaseCollection/User";

export class UserService {

  public static onValueFromRealTimeDb(callBack: (data: UserDTO[]) => void) {
    onValue(ref(db, "/users"), async (snapshot) => {
      const users: UserDTO[] = snapshot.val();
      if (users !== null) {
        callBack(users);
      }
    });
  }

  public static writeNewUserData(data: UserDTO) {
    const usersListRef = ref(db, "/users/" + data.uuid);
    set(usersListRef, {
      uuid: data.uuid,
      email: data.name,
      name: data.email,
      ownWays: data.ownWays,
      favoriteWays: data.favoriteWays,
      mentoringWays: data.mentoringWays,
    });
  }

}