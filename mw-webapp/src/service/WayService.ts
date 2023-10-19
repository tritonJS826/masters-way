import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "src/firebase";
import {WayDTO} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_WAYS_COLLECTION = "ways";

/**
 * Provides methods to interact with the Ways collection in Firestore.
 */
export class WayService {

  /**
   * Get WaysDTO
   */
  public static async getWaysDTO(): Promise<WayDTO[]> {
    const waysRaw = await getDocs(collection(db, PATH_TO_WAYS_COLLECTION));
    const ways = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    return ways;
  }

  /**
   * Get WayDTO by Uuid
   */
  public static async getWayDTO(uuid: string): Promise<WayDTO> {
    const wayRaw = await getDoc(doc(db, PATH_TO_WAYS_COLLECTION, uuid));
    const way: WayDTO = documentSnapshotToDTOConverter<WayDTO>(wayRaw);

    return way;
  }

  /**
   * Get WaysDTO by Owner Uuid
   */
  public static async getOwnedWaysDTO(uuid: string): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const waysQuery = query(waysRef, where("ownerUuid", "==", uuid));
    const waysRaw = await getDocs(waysQuery);
    const ways = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    return ways;
  }

}