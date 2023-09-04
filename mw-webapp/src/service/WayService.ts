import {ref, onValue} from "firebase/database";
import {db} from "src/firebase";
import {DayReport} from "src/model/businessModel/DayReport";
// import {Way} from "src/model/businessModel/Way";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";

export class WayService {

  public static onValueFromRealTimeDb(callBack: (data: WayDTO[]) => void) {
    onValue(ref(db, "/ways"), async (snapshot) => {
      const waysRaw: WayDTO[] = snapshot.val();
      if (waysRaw !== null) {
        const waysDTO: WayDTO[] = Object.values(waysRaw);
        // const ways = wayDTO.map(userDTOToBusinessConverter);
        callBack(waysDTO);
      }
    });
  }

  public static onValueByIdFromRealTimeDb(callBack: (data: DayReport) => void, uuid: string) {
    onValue(ref(db, "/ways"), async (snapshot) => {
      const wayRaw: DayReport[] = snapshot.val();
      if (wayRaw !== null) {
        const wayDTO: DayReport[] = Object.values(wayRaw);
        // const ways = wayDTO.map(userDTOToBusinessConverter);
        const way = wayDTO.find((wayItem) => wayItem.uuid === uuid);
        if (way) {
          callBack(way);
        }
      }
    });
  }

}