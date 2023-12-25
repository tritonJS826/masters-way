import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {WayDTOMigration} from "../DTOModel/WayDTO.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";

export const PATH_TO_WAYS_COLLECTION = "ways";

/**
 * Provides methods to interact with the Ways collection in Firestore.
 */
export class WayService {

  /**
   * Get WaysDTO
   */
  public static async getWaysDTO(): Promise<WayDTOMigration[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const waysRaw = await getDocs(waysRef);
    const waysDTO = querySnapshotToDTOConverter<WayDTOMigration>(waysRaw);

    return waysDTO;
  }

}