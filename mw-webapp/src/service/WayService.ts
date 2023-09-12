import {ref, get} from "firebase/database";
import {WayDTOToWayConverter} from "src/converter/WayConverter";
import {db} from "src/firebase";
import {Way} from "src/model/businessModel/Way";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";

// export class WayService {

//   public static onValueFromRealTimeDb(callBack: (data: WayDTO[]) => void) {
//     onValue(ref(db, "/ways"), async (snapshot) => {
//       const ways: WayDTO[] = snapshot.val();
//       if (ways !== null) {
//         callBack(ways);
//       }
//     });
//   }

// }

export class WayService {

  public static async onValueFromRealTimeDb(): Promise<Way[]> {
    const snapshot = await get(ref(db, "/ways"));
    const waysRaw: WayDTO[] = await snapshot.val();
    const ways: Way[] = waysRaw.map((item) =>
      WayDTOToWayConverter(item));
    return ways;
  }

}