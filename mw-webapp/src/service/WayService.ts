import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "src/firebase";
import {WayDTO} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {UserService} from "src/service/UserService";

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
  public static async getOwnWaysDTO(uuid: string): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const ownWaysQuery = query(waysRef, where("ownerUuid", "==", uuid));
    const ownWaysRaw = await getDocs(ownWaysQuery);
    const ownWays = querySnapshotToDTOConverter<WayDTO>(ownWaysRaw);

    return ownWays;
  }

  /**
   * Get WaysDTO of user mentoring ways
   */
  public static async getMentoringWaysDTO(uuid: string): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const mentoringWaysQuery = query(waysRef, where("currentMentorUuids", "array-contains", uuid));
    const mentoringWaysRaw = await getDocs(mentoringWaysQuery);
    const mentoringWays = querySnapshotToDTOConverter<WayDTO>(mentoringWaysRaw);

    return mentoringWays;
  }

  /**
   * Get WaysDTO of user favourite ways
   */
  public static async getFavouriteWaysDTO(uuid: string): Promise<WayDTO[]> {
    const userDTO = await UserService.getUserDTO(uuid);
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const favouriteWaysQuery = query(waysRef, where("uuid", "in", userDTO.favoriteWayUuids));
    const mentoringWaysRaw = await getDocs(favouriteWaysQuery);
    const mentoringWays = querySnapshotToDTOConverter<WayDTO>(mentoringWaysRaw);

    return mentoringWays;
  }

}