import {ref, onValue} from "firebase/database";
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

}