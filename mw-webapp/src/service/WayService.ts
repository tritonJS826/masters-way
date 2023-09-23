import {collection, getDocs} from "firebase/firestore";
import {WayDTOToWayPreviewConverter} from "src/convertDTOToBusiness/wayConverter";
import {db} from "src/firebase";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";

const PATH_TO_WAYS_COLLECTION = "ways";

export class WayService {

  public static async getWays(): Promise<WayDTO[]> {
    const waysRaw = await getDocs(collection(db, PATH_TO_WAYS_COLLECTION));
    const ways = WayDTOToWayPreviewConverter(waysRaw);
    return ways;
  }

}