import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {db} from "src/firebase";
import {WayDTO} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_WAYS_COLLECTION = "ways";

/**
 * WayDTO props without uuid
 */
export type WayDTOWithoutUuid = Omit<WayDTO, "uuid">;

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
   * Create WayDTO
   */
  public static async createWayDTO(data: WayDTOWithoutUuid) {
    const docRef = doc(collection(db, PATH_TO_WAYS_COLLECTION));
    const DEFAULT_WAY: WayDTO = {
      ...data,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_WAY);
  }

  /**
   * Get WaysDTO by Owner Uuid
   */
  public static async getOwnWaysDTO(uuid: string): Promise<WayDTO[]> {
    const ownWaysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const ownWaysQuery = query(ownWaysRef, where("ownerUuid", "==", uuid));
    const ownWaysRaw = await getDocs(ownWaysQuery);
    const ownWays = querySnapshotToDTOConverter<WayDTO>(ownWaysRaw);

    return ownWays;
  }

  /**
   * Get WaysDTO of user mentoring ways
   */
  public static async getMentoringWaysDTO(uuid: string): Promise<WayDTO[]> {
    const mentoringWaysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const mentoringWaysQuery = query(mentoringWaysRef, where("currentMentorUuids", "array-contains", uuid));
    const mentoringWaysRaw = await getDocs(mentoringWaysQuery);
    const mentoringWays = querySnapshotToDTOConverter<WayDTO>(mentoringWaysRaw);

    return mentoringWays;
  }

}