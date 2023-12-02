import {collection, doc, getDoc, getDocs, orderBy, query, updateDoc} from "firebase/firestore";
import {db} from "../firebase.js";
import {WayDTO} from "../DTOModel/WayDTO.js";
import {documentSnapshotToDTOConverter} from "../converter/documentSnapshotToDTOConverter.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";

const PATH_TO_WAYS_COLLECTION = "ways";


/**
 * Provides methods to interact with the Ways collection in Firestore.
 */
export class WayService {

  /**
   * Get WaysDTO
   */
  public static async getWaysDTO(): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const waysOrderedByName = query(waysRef, orderBy("name", "desc"));
    const waysRaw = await getDocs(waysOrderedByName);
    const waysDTO = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    return waysDTO;
  }

  /**
   * Get WayDTO by Uuid
   */
  public static async getWayDTO(uuid: string): Promise<WayDTO> {
    const wayRaw = await getDoc(doc(db, PATH_TO_WAYS_COLLECTION, uuid));
    const wayDTO = documentSnapshotToDTOConverter<WayDTO>(wayRaw);

    return wayDTO;
  }


  /**
   * Update WayDTO
   */
  public static async updateWayDTO(wayDTO: WayDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_WAYS_COLLECTION, uuid), wayDTO);
  }

}