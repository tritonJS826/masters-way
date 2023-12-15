import {collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where, WriteBatch} from "firebase/firestore";
import {db} from "src/firebase";
import {
  WAY_MENTOR_UUIDS_FIELD,
  WAY_NAME_FIELD,
  WAY_OWNER_UUID_FIELD,
  WAY_UUID_FIELD,
  WayDTO,
  WayDTOSchema,
  WaysDTOSchema,
} from "src/model/DTOModel/WayDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {UserService} from "src/service/UserService";

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
    const waysOrderedByName = query(waysRef, orderBy(WAY_NAME_FIELD, "desc"));
    const waysRaw = await getDocs(waysOrderedByName);
    const waysDTO = querySnapshotToDTOConverter<WayDTO>(waysRaw);

    const validatedWaysDTO = WaysDTOSchema.parse(waysDTO);

    return validatedWaysDTO;
  }

  /**
   * Get WayDTO by Uuid
   */
  public static async getWayDTO(uuid: string): Promise<WayDTO> {
    const wayRaw = await getDoc(doc(db, PATH_TO_WAYS_COLLECTION, uuid));
    const wayDTO = documentSnapshotToDTOConverter<WayDTO>(wayRaw);

    const validatedWayDTO = WayDTOSchema.parse(wayDTO);

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

    return validatedWayDTO;
  }

  /**
   * Update WayDTO
   */
  public static async updateWayDTO(wayDTO: WayDTO, uuid: string) {
    const validatedWayDTO = WayDTOSchema.parse(wayDTO);
    await updateDoc(doc(db, PATH_TO_WAYS_COLLECTION, uuid), {...validatedWayDTO});
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

    return validatedFavoriteWaysDTO;
  }

  /**
   * Update favoriteForUserUuids of Way with batch
   */
  public static async updateFavoriteForUserUuidsWithBatch(
    wayUuid: string,
    updatedFavoriteForUserUuids: string[],
    batch: WriteBatch,
  ) {
    const wayref = doc(db, PATH_TO_WAYS_COLLECTION, wayUuid);
    batch.update(wayref, {favoriteForUserUuids: updatedFavoriteForUserUuids});
  }

}
