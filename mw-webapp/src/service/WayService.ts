import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";

const PATH_TO_WAYS_COLLECTION = "ways";

export class WayService {

  public static async getWays(callBack: (data: WayDTO[]) => void) {
    const waysRaw = await getDocs(collection(db, PATH_TO_WAYS_COLLECTION));
    const ways: WayDTO[] = waysRaw.docs.map((wayRaw) => ({
      uuid: wayRaw.data().uuid,
      ownerUuid: wayRaw.data().ownerUuid,
      monthReportUuids: wayRaw.data().monthReportUuids,
      dayReportUuids: wayRaw.data().dayReportUuids,
      goalUuid: wayRaw.data().goalUuid,
      currentMentors: wayRaw.data().currentMentors,
      isCompleted: wayRaw.data().isCompleted,
    }));
    callBack(ways);
  }

}