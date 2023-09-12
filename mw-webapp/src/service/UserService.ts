import {ref, get} from "firebase/database";
import {UserDTOToUserConverter} from "src/converter/UserConverter";
import {db} from "src/firebase";
import {User} from "src/model/businessModel/User";
import {User as UserDTO} from "src/model/firebaseCollection/User";

// export class UserService {

//   public static onValueFromRealTimeDb(callBack: (data: UserDTO[]) => void) {
//     onValue(ref(db, "/users"), async (snapshot) => {
//       const users: UserDTO[] = snapshot.val();
//       if (users !== null) {
//         callBack(users);
//       }
//     });
//   }

// }


export class UserService {

  public static async onValueFromRealTimeDb(): Promise<User[]> {
    const snapshot = await get(ref(db, "/users"));
    const usersRaw: UserDTO[] = await snapshot.val();
    const users: User[] = Object.values(usersRaw).map((item) =>
      UserDTOToUserConverter(item));
    return users;
  }

}