import {collection, getDocs} from "firebase/firestore";
import {querySnapshotToWayDTOConverter} from "src/converter/wayConverter";
import {db} from "src/firebase";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";
import {PathToCollection} from "src/service/PathToCollection";

export class WayService {

  public static async getWays(): Promise<WayDTO[]> {
    const waysRaw = await getDocs(collection(db, PathToCollection.ways));
    const ways = querySnapshotToWayDTOConverter(waysRaw);
    return ways;
  }

}