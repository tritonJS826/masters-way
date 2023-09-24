import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_WAYS_COLLECTION = "ways";

export class WayService {

  public static async getWays(): Promise<WayDTO[]> {
    const waysRaw = await getDocs(collection(db, PATH_TO_WAYS_COLLECTION));
    const ways = querySnapshotToDTOConverter<WayDTO>(waysRaw);
    return ways;
  }

}