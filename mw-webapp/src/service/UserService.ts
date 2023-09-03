import {ref, onValue} from "firebase/database";
import {db} from "src/firebase";
// import {User} from "src/model/businessModel/User";
import {User as UserDTO} from "src/model/firebaseCollection/User";
// import {Way} from "src/model/businessModel/Way";
// import {WayService} from "src/service/WayService";

export class UserService {

  public static onValueFromRealTimeDb(callBack: (data: UserDTO[]) => void) {
    onValue(ref(db, "/users"), async (snapshot) => {
      const usersRaw: UserDTO[] = snapshot.val();
      if (usersRaw !== null) {
        const usersDTO: UserDTO[] = Object.values(usersRaw);
        // const users = usersDTO.map(userDTOToBusinessConverter);
        callBack(usersDTO);
      }
    });
  }

  public static onValueByIdFromRealTimeDb(callBack: (data: UserDTO) => void, uuid: string) {
    onValue(ref(db, "/users/" + uuid), async (snapshot) => {
      const userRaw: UserDTO = snapshot.val();
      if (userRaw !== null) {
        // const userDTO: UserDTO = Object.values(userRaw);
        // const user = userDTOToBusinessConverter(userRaw);
        callBack(userRaw);
      }
    });
  }

}