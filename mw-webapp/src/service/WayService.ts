import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QueryStartAtConstraint,
  setDoc,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  WriteBatch,
} from "firebase/firestore";
import {db} from "src/firebase";
import {ABANDONED_AFTER_MS} from "src/logic/waysTable/wayStatus";
import {
  WAY_LAST_UPDATE_FIELD,
  WAY_STATUS_FIELD,
  WAY_UUID_FIELD, WayDTO,
  WayDTOSchema,
  WayPartialDTOSchema,
  WaysDTOSchema,
} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {AMOUNT_DOCS_FOR_COUNT_READS, QUERY_LIMIT} from "src/service/firebaseVariables";
import {RequestOperations} from "src/service/RequestOperations";
import {getChunksArray} from "src/utils/getChunkArray";
import {logToConsole} from "src/utils/logToConsole";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

const PATH_TO_WAYS_COLLECTION = "ways";
const PAGINATION_WAYS_AMOUNT = 10;

type Constraints = QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint | QueryStartAtConstraint;

/**
 * WayDTO props without uuid
 */
export type WayDTOWithoutUuid = Omit<WayDTO, "uuid">;

export type GetWaysFilter = {

  /**
   * Show only ways in progress
   */
  isInProgress?: boolean;

  /**
   * Show only completed ways
   */
  isCompleted?: boolean;

  /**
   * Show only abandoned ways
   */
  isAbandoned?: boolean;
}

/**
 * Pagination and filter params
 */
export interface GetWaysParams {

  /**
   * Last fetched way uuid
   */
  lastWayUuid?: string;

  /**
   * Filter
   */
  filter?: GetWaysFilter;
}

/**
 * Constraints params
 */
interface ConstraintsParams {

  /**
   * Snapshot of the last document that was fetched
   */
  snapshot?: "" | DocumentSnapshot<DocumentData, DocumentData>;

  /**
   * Filter
   */
  filter?: GetWaysFilter;

  /**
   * Amount of pagination elements
   */
  limit?: number;
}

/**
 * Get constraints to fetch ways
 */
const getConstraints = (params: ConstraintsParams) => {
  const completedConstraints = params.filter?.isCompleted ? [where(WAY_STATUS_FIELD, "==", "completed")] : [];
  const currentDate = new Date();
  const abandonedDate = currentDate.getTime() - ABANDONED_AFTER_MS;
  const inProgressConstraints = params.filter?.isInProgress
    ? [
      where(WAY_STATUS_FIELD, "==", null),
      where(WAY_LAST_UPDATE_FIELD, ">", Timestamp.fromMillis(abandonedDate)),
    ]
    : [];
  const abandonedConstraints = params.filter?.isAbandoned
    ? [
      where(WAY_STATUS_FIELD, "==", null),
      where(WAY_LAST_UPDATE_FIELD, "<", Timestamp.fromMillis(abandonedDate)),
    ]
    : [];

  const limitConstraints = params.limit
    ? [limit(PAGINATION_WAYS_AMOUNT)]
    : [];

  const startAfterConstraints = params.snapshot ? [startAfter(params.snapshot)] : [];

  const constraints: Constraints[] = [
    ...completedConstraints,
    ...inProgressConstraints,
    ...abandonedConstraints,
    orderBy(WAY_LAST_UPDATE_FIELD, "desc"),
    ...limitConstraints,
    ...startAfterConstraints,
  ];

  return constraints;
};

/**
 * Provides methods to interact with the Ways collection in Firestore.
 */
export class WayService {

  /**
   * Get WaysDTO amount
   */
  public static async getWaysDTOAmount(filter?: GetWaysFilter): Promise<number> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);

    const currentConstraints = getConstraints({filter});

    const snapshot = await getCountFromServer(query(waysRef, ...currentConstraints));
    const waysAmount = snapshot.data().count;

    const readsAmount = Math.ceil(waysAmount / AMOUNT_DOCS_FOR_COUNT_READS);

    logToConsole(`WayService:getWaysDTOAmount: ${readsAmount} ${RequestOperations.READ} operations`);

    return waysAmount;
  }

  /**
   * Get WaysDTO
   */
  public static async getWaysDTO(params: GetWaysParams): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);

    /**
     * ExtraRequest that allow us to use startAfter method
     */
    const snapshot = params.lastWayUuid && await getDoc(doc(db, PATH_TO_WAYS_COLLECTION, params.lastWayUuid));
    logToConsole(`WayService:getSnapshot: 1 ${RequestOperations.READ} operations`);

    const currentConstraints = getConstraints({filter: params.filter, snapshot, limit: PAGINATION_WAYS_AMOUNT});

    const waysOrderedByName = query(waysRef, ...currentConstraints);
    const waysRaw = await getDocs(waysOrderedByName);
    const waysDTO = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    const validatedWaysDTO = WaysDTOSchema.parse(waysDTO);

    logToConsole(`WayService:getWaysDTO: ${validatedWaysDTO.length} ${RequestOperations.READ} operations`);

    return validatedWaysDTO;
  }

  /**
   * Get WaysDTO by uuids
   */
  public static async getWaysDTOByUuids(wayUuids: string[], filter?: GetWaysFilter): Promise<WayDTO[]> {
    const waysRef = collection(db, PATH_TO_WAYS_COLLECTION);
    const chunksWaysDTO = getChunksArray(wayUuids, QUERY_LIMIT);

    const currentConstraints = getConstraints({filter});

    const waysDTOQueries = chunksWaysDTO.map((chunk) => {
      return query(
        waysRef,
        where(WAY_UUID_FIELD, "in", chunk),
        ...currentConstraints,
      );
    });

    const waysRaw = await Promise.all(waysDTOQueries.map(getDocs));
    const waysDTO = querySnapshotsToDTOConverter<WayDTO>(waysRaw);

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
  public static async updateWayDTO(wayDTO: PartialWithUuid<WayDTO>) {
    const validatedWayDTO = WayPartialDTOSchema.parse(wayDTO);

    await updateDoc(doc(db, PATH_TO_WAYS_COLLECTION, validatedWayDTO.uuid), validatedWayDTO);

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
   * Create WayDTO with Batch
   */
  public static createWayDTOWithBatch(wayDTOWithoutUuid: WayDTOWithoutUuid, batch: WriteBatch): WayDTO {
    const docRef = doc(collection(db, PATH_TO_WAYS_COLLECTION));
    const wayDTO = {
      ...wayDTOWithoutUuid,
      uuid: docRef.id,
    };

    batch.set(docRef, wayDTO);

    const validatedWayDTO = WayDTOSchema.parse(wayDTO);

    logToConsole(`WayService:createWayDTOWithBatch: 1 ${RequestOperations.WRITE} operation`);

    return validatedWayDTO;
  }

  /**
   * Update favoriteForUserUuids of Way with batch
   */
  public static updateWayDTOWithBatch(updatedWay: PartialWithUuid<WayDTO>, batch: WriteBatch) {
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
