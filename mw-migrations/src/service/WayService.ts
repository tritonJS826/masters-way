import {collection, doc, deleteDoc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";
import {WayBackup, WayDTOMigration} from "../DTOModel/WayDTO.js";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";
import { Timestamp } from "firebase/firestore";
import { getNanosecondsThreeSymbols } from "../utils/getNanoSecondsThreeSymbols.js";

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

  /**
   * Create WayTO
   */
  public static async createWayDTO(wayDTO: WayDTOMigration): Promise<WayDTOMigration> {
    const docRef = doc(collection(db, PATH_TO_WAYS_COLLECTION));

    await setDoc(docRef, wayDTO);
      
    return wayDTO;
  }

  /**
   * For import purposes
   */
  public static async importWay(way: WayBackup): Promise<WayBackup> {
    const createdAtNanoseconds = getNanosecondsThreeSymbols(way.createdAt.nanoseconds);
    const lastUpdateNanoseconds = getNanosecondsThreeSymbols(way.lastUpdate.nanoseconds);
    const createdAtTimestamp = Number(`${way.createdAt.seconds}${createdAtNanoseconds}`);
    const createdAt = new Date(createdAtTimestamp);
    const lastUpdateTimestamp = Number(`${way.lastUpdate.seconds}${lastUpdateNanoseconds}`);
    const lastUpdate = new Date(lastUpdateTimestamp);

    const wayToImport = {
      ...way,
      createdAt: Timestamp.fromDate(createdAt),
      lastUpdate: Timestamp.fromDate(lastUpdate),
    };

    await setDoc(doc(db, PATH_TO_WAYS_COLLECTION, way.uuid), wayToImport);
  
    return way;
  }
  

  /**
   * Delete WayDTO
   */
  public static async deleteWayDTO(wayUuid: string) {
    deleteDoc(doc(db, PATH_TO_WAYS_COLLECTION, wayUuid));
  }

}