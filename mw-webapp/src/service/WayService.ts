import {ref, onValue} from "firebase/database";
import {db} from "src/firebase";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";

export class WayService {

  public static onValueFromRealTimeDb(callBack: (data: WayDTO[]) => void) {
    onValue(ref(db, "/ways"), async (snapshot) => {
      const ways: WayDTO[] = snapshot.val();
      if (ways !== null) {
        callBack(ways);
      }
    });
  }

}