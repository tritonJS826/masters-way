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
  updateDoc,
  where,
  WriteBatch,
} from "firebase/firestore";
import {db} from "src/firebase";
import {
  USER_EMAIL_FIELD,
  USER_UUID_FIELD,
  UserDTO,
  UserDTOSchema,
  UserPartialDTOSchema,
  UsersDTOSchema,
} from "src/model/DTOModel/UserDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {AMOUNT_DOCS_FOR_COUNT_READS, QUERY_LIMIT} from "src/service/firebaseVariables";
import {RequestOperations} from "src/service/RequestOperations";
import {getChunksArray} from "src/utils/getChunkArray";
import {logToConsole} from "src/utils/logToConsole";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

export const PATH_TO_USERS_COLLECTION = "users";
const PAGINATION_USERS_AMOUNT = 10;

type Constraints = QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint | QueryStartAtConstraint;

/**
 * Pagination and filter params
 */
export interface GetUsersParams {

  /**
   * Last fetched way uuid
   */
  lastUserUuid?: string;

  /**
   * FilterEmail
   */
  filterEmail?: string;
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
  filterEmail?: string;

  /**
   * Amount of pagination elements
   */
  limit?: number;
}

/**
 * Get constraints to fetch ways
 */
const getConstraints = (params: ConstraintsParams) => {
  const emailConstraints = params.filterEmail
    ? [
      orderBy(USER_EMAIL_FIELD),
      where(USER_EMAIL_FIELD, ">=", params.filterEmail),
      where(USER_EMAIL_FIELD, "<", params.filterEmail + "\uf8ff"),
    ]
    : [];

  const limitConstraints = params.limit
    ? [limit(PAGINATION_USERS_AMOUNT)]
    : [];

  const startAfterConstraints = params.snapshot ? [startAfter(params.snapshot)] : [];

  const constraints: Constraints[] = [
    ...emailConstraints,
    ...limitConstraints,
    ...startAfterConstraints,
  ];

  return constraints;
};

/**
 * Provides methods to interact with the Users collection in Firestore.
 */
export class UserService {

  /**
   * Get UsersDTO amount
   */
  public static async getUsersDTOAmount(filterEmail?: string): Promise<number> {
    const usersRef = collection(db, PATH_TO_USERS_COLLECTION);

    const currentConstraints = getConstraints({filterEmail});

    const snapshot = await getCountFromServer(query(usersRef, ...currentConstraints));
    const usersAmount = snapshot.data().count;

    const readsAmount = Math.ceil(usersAmount / AMOUNT_DOCS_FOR_COUNT_READS);

    logToConsole(`UserService:getUsersDTOAmount: ${readsAmount} ${RequestOperations.READ} operations`);

    return usersAmount;
  }

  /**
   * Get UsersDTO
   */
  public static async getUsersDTO(params: GetUsersParams): Promise<UserDTO[]> {
    const usersRef = collection(db, PATH_TO_USERS_COLLECTION);

    /**
     * ExtraRequest that allow us to use startAfter method
     */
    const snapshot = params.lastUserUuid && await getDoc(doc(db, PATH_TO_USERS_COLLECTION, params.lastUserUuid));
    logToConsole(`WayService:getSnapshot: 1 ${RequestOperations.READ} operations`);

    const currentConstraints = getConstraints({filterEmail: params.filterEmail, snapshot, limit: PAGINATION_USERS_AMOUNT});

    const usersOrderedByName = query(usersRef, ...currentConstraints);
    const usersRaw = await getDocs(usersOrderedByName);
    const usersDTO = querySnapshotToDTOConverter<UserDTO>(usersRaw);

    const validatedUsersDTO = UsersDTOSchema.parse(usersDTO);

    logToConsole(`UserService:getUsersDTO: ${validatedUsersDTO.length} ${RequestOperations.READ} operations`);

    return validatedUsersDTO;
  }

  /**
   * Get UsersDTO by uuids
   */
  public static async getUsersDTOByUuids(userUuids: string[]): Promise<UserDTO[]> {
    const usersRef = collection(db, PATH_TO_USERS_COLLECTION);
    const chunksUsersDTO = getChunksArray(userUuids, QUERY_LIMIT);
    const userDTOQueries = chunksUsersDTO.map((chunk) => {
      return query(usersRef, where(USER_UUID_FIELD, "in", chunk));
    });

    const usersRaw = await Promise.all(userDTOQueries.map(getDocs));

    const usersDTO = querySnapshotsToDTOConverter<UserDTO>(usersRaw);

    const validatedUsersDTO = UsersDTOSchema.parse(usersDTO);

    logToConsole(`UserService:getUsersDTOByUuids: ${validatedUsersDTO.length} ${RequestOperations.READ} operations`);

    return validatedUsersDTO;
  }

  /**
   * Get UserDTO by Uuid
   */
  public static async getUserDTO(uuid: string): Promise<UserDTO> {
    const userRaw = await getDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
    const userDTO = documentSnapshotToDTOConverter<UserDTO>(userRaw);

    const validatedUserDTO = UserDTOSchema.parse(userDTO);

    logToConsole(`UserService:getUserDTO: 1 ${RequestOperations.READ} operation`);

    return validatedUserDTO;
  }

  /**
   * Create new user
   * @param userDTO UserDTO
   */
  public static async createUserDTO(userDTO: UserDTO) {
    const validatedUserDTO = UserDTOSchema.parse(userDTO);

    await setDoc(doc(db, PATH_TO_USERS_COLLECTION, userDTO.uuid), validatedUserDTO);

    logToConsole(`UserService:createUserDTO: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Update UserDTO
   */
  public static async updateUserDTO(userDTO: PartialWithUuid<UserDTO>) {
    const validatedUserDTO = UserPartialDTOSchema.parse(userDTO);

    await updateDoc(doc(db, PATH_TO_USERS_COLLECTION, validatedUserDTO.uuid), validatedUserDTO);

    logToConsole(`UserService:updateUserDTO: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Delete user
   * @param {string} uuid User's uuid
   */
  public static async deleteUserDTO(uuid: string) {
    await deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));

    logToConsole(`UserService:deleteUserDTO: 1 ${RequestOperations.DELETE} operation`);
  }

  /**
   * Update favoriteWayUuids of User with batch
   */
  public static updateUserDTOWithBatch(updatedUserDTO: PartialWithUuid<UserDTO>, batch: WriteBatch) {
    const userRef = doc(db, PATH_TO_USERS_COLLECTION, updatedUserDTO.uuid);
    batch.update(userRef, updatedUserDTO);

    logToConsole(`UserService:updateUserDTOWithBatch: 1 ${RequestOperations.DELETE} operation`);
  }

}
