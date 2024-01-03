import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where, WriteBatch}
  from "firebase/firestore";
import {db} from "src/firebase";
import {
  WAY_CREATED_AT_FIELD,
  WAY_UUID_FIELD,
  WayDTO,
  WayDTOSchema,
  WaysDTOSchema,
} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {RequestOperations} from "src/service/RequestOperations";
import {logToConsole} from "src/utils/logToConsole";

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
   * Get WaysDTO by uuids
   */
  public static async getWaysDTOByUuids(wayUuids: string[]): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const waysSortedByUuid = query(waysRef, where(WAY_UUID_FIELD, "in", wayUuids), orderBy(WAY_CREATED_AT_FIELD, "desc"));
    const waysRaw = await getDocs(waysSortedByUuid);
    const waysDTO = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    const validatedWaysDTO = WaysDTOSchema.parse(waysDTO);

    logToConsole(`WayService:getWaysDTOByUuids: ${validatedWaysDTO.length} ${RequestOperations.READ} operations`);

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
