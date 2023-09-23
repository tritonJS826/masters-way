import {DataSnapshot, off, onValue, ref} from "firebase/database";
import {db} from "src/firebase";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";

export class WayService {

  public static onValueFromRealTimeDb(callBack: (data: WayDTO[]) => void) {
    const wayRef = ref(db, "/ways");

    const handleValueChange = async (snapshot: DataSnapshot) => {
      const ways: WayDTO[] = snapshot.val();
      if (ways !== null) {
        callBack(ways);
      }
    };

    onValue(wayRef, handleValueChange);

    return () => {
      off(wayRef, "value", handleValueChange);
    };
  }

}