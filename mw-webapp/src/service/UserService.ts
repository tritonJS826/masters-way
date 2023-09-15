import {ref, get, set} from "firebase/database";
import {UserDTOToUserConverter} from "src/converter/UserConverter";
import {db} from "src/firebase";
import {User} from "src/model/businessModel/User";
import {User as UserDTO} from "src/model/firebaseCollection/User";

// TODO: use onValue method instead of get if it's possible (all services files)
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

  public static async getValueFromRealTimeDb(): Promise<User[]> {
    const snapshot = await get(ref(db, "/users"));
    const usersRaw: UserDTO[] = await snapshot.val();
    const users: User[] = Object.values(usersRaw).map((item) =>
      UserDTOToUserConverter(item));
    return users;
  }

  public static writeNewUserData(data: UserDTO) {
    const usersListRef = ref(db, "/users/" + data.uuid);
    set(usersListRef, {
      uuid: data.uuid,
      email: data.email,
      name: data.name,
      ownWays: data.ownWays,
      favoriteWays: data.favoriteWays,
      mentoringWays: data.mentoringWays,
    });
  }

}