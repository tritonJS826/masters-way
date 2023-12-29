import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where, WriteBatch}
  from "firebase/firestore";
import {db} from "src/firebase";
import {
  WAY_CREATED_AT_FIELD,
  WAY_MENTOR_UUIDS_FIELD,
  WAY_OWNER_UUID_FIELD,
  WAY_UUID_FIELD,
  WayDTO,
  WayDTOSchema,
  WaysDTOSchema,
} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {UserService} from "src/service/UserService";
import {logToConsole} from "src/utils/logToConsole";
import {RequestOperations} from "src/utils/RequestOperations";

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
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const waysOrderedByName = query(waysRef, orderBy(WAY_CREATED_AT_FIELD, "desc"));
    const waysRaw = await getDocs(waysOrderedByName);
    const waysDTO = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    const validatedWaysDTO = WaysDTOSchema.parse(waysDTO);

    logToConsole(`WayService:getWaysDTO: ${validatedWaysDTO.length} ${RequestOperations.READ} operations`);

    return validatedWaysDTO;
  }

  /**
   * Get WayDTO by Uuid
   */
  public static async getWayDTO(uuid: string): Promise<WayDTO> {
    const wayRaw = await getDoc(doc(db, PATH_TO_WAYS_COLLECTION, uuid));
    const wayDTO = documentSnapshotToDTOConverter<WayDTO>(wayRaw);

    const validatedWayDTO = WayDTOSchema.parse(wayDTO);

    logToConsole(`WayService:getWayDTO: 1 ${RequestOperations.READ} operation`);

    return validatedWayDTO;
  }

  /**
   * Create WayDTO
   */
  public static async createWayDTO(wayDTOWithoutUuid: WayDTOWithoutUuid): Promise<WayDTO> {
    const docRef = doc(collection(db, PATH_TO_WAYS_COLLECTION));

    const wayDTO = {
      ...wayDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedWayDTO = WayDTOSchema.parse(wayDTO);

    await setDoc(docRef, validatedWayDTO);

    logToConsole(`WayService:createWayDTO: 1 ${RequestOperations.WRITE} operation`);

    return validatedWayDTO;
  }

  /**
   * Update WayDTO
   */
  public static async updateWayDTO(wayDTO: WayDTO) {
    const validatedWayDTO = WayDTOSchema.parse(wayDTO);
    await updateDoc(doc(db, PATH_TO_WAYS_COLLECTION, wayDTO.uuid), {...validatedWayDTO});

    logToConsole(`WayService:updateWayDTO: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Get WaysDTO by Owner Uuid
   */
  public static async getOwnWaysDTO(uuid: string): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const ownWaysQuery = query(waysRef, where(WAY_OWNER_UUID_FIELD, "==", uuid));
    const ownWaysRaw = await getDocs(ownWaysQuery);
    const ownWaysDTO = querySnapshotToDTOConverter<WayDTO>(ownWaysRaw);

    const validatedOwnWaysDTO = WaysDTOSchema.parse(ownWaysDTO);

    logToConsole(`WayService:getOwnWaysDTO: ${validatedOwnWaysDTO.length} ${RequestOperations.READ} operations`);

    return validatedOwnWaysDTO;
  }

  /**
   * Get WaysDTO of user mentoring ways
   */
  public static async getMentoringWaysDTO(uuid: string): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const mentoringWaysQuery = query(waysRef, where(WAY_MENTOR_UUIDS_FIELD, "array-contains", uuid));
    const mentoringWaysRaw = await getDocs(mentoringWaysQuery);
    const mentoringWaysDTO = querySnapshotToDTOConverter<WayDTO>(mentoringWaysRaw);

    const validatedMentoringWaysDTO = WaysDTOSchema.parse(mentoringWaysDTO);

    logToConsole(`WayService:getMentoringWaysDTO: ${validatedMentoringWaysDTO.length} ${RequestOperations.READ} operations`);

    return validatedMentoringWaysDTO;
  }

  /**
   * Get WaysDTO of user favorite ways
   */
  public static async getFavoriteWaysDTO(uuid: string): Promise<WayDTO[]> {
    const userDTO = await UserService.getUserDTO(uuid);

    if (!userDTO.favoriteWayUuids.length) {
      return [];
    }

    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const favoriteWaysQuery = query(waysRef, where(WAY_UUID_FIELD, "in", userDTO.favoriteWayUuids));
    const favoriteWaysRaw = await getDocs(favoriteWaysQuery);
    const favoriteWaysDTO = querySnapshotToDTOConverter<WayDTO>(favoriteWaysRaw);

    const validatedFavoriteWaysDTO = WaysDTOSchema.parse(favoriteWaysDTO);

    logToConsole(`WayService:getFavoriteWaysDTO: ${validatedFavoriteWaysDTO.length} ${RequestOperations.READ} operations`);

    return validatedFavoriteWaysDTO;
  }

  /**
   * Delete WayDTO
   */
  public static async deleteWayDTO(wayDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_WAYS_COLLECTION, wayDTOUuid));

    logToConsole(`WayService:deleteWayDTO: 1 ${RequestOperations.DELETE} operation`);
  }

  /**
   * Update favoriteForUserUuids of Way with batch
   */
  public static updateWayDTOWithBatch(updatedWay: WayDTO, batch: WriteBatch) {
    const wayRef = doc(db, PATH_TO_WAYS_COLLECTION, updatedWay[WAY_UUID_FIELD]);
    batch.update(wayRef, updatedWay);

    logToConsole(`WayService:updateWayDTOWithBatch: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Delete WayDTO with batch
   */
  public static deleteWayDTOWithBatch(wayDTOUuid: string, batch: WriteBatch) {
    const wayRef = doc(db, PATH_TO_WAYS_COLLECTION, wayDTOUuid);
    batch.delete(wayRef);

    logToConsole(`WayService:deleteWayDTOWithBatch: 1 ${RequestOperations.DELETE} operation`);
  }

}
