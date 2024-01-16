import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  WriteBatch,
} from "firebase/firestore";
import {db} from "src/firebase";
import {USER_UUID_FIELD, UserDTO, UserDTOSchema, UsersDTOSchema} from "src/model/DTOModel/UserDTO";
import {QUERY_LIMIT} from "src/service/config";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotsToDTOConverter} from "src/service/converter/querySnapshotsToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";
import {RequestOperations} from "src/service/RequestOperations";
import {getChunksArray} from "src/utils/getChunkArray";
import {logToConsole} from "src/utils/logToConsole";

export const PATH_TO_USERS_COLLECTION = "users";

/**
 * Provides methods to interact with the Users collection in Firestore.
 */
export class UserService {

  /**
   * Get UsersDTO
   */
  public static async getUsersDTO(): Promise<UserDTO[]> {
    const usersRaw = await getDocs(collection(db, PATH_TO_USERS_COLLECTION));
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

    const usersRaw = await Promise.all(userDTOQueries.map(async (item) => {
      const chunksUserDTO = await getDocs(item);

      return chunksUserDTO;
    }));

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
   * Update user
   * @param userDTO UserDTO
   */
  public static async updateUserDTO(userDTO: UserDTO) {
    const validatedUserDTO = UserDTOSchema.parse(userDTO);

    await updateDoc(doc(db, PATH_TO_USERS_COLLECTION, userDTO.uuid), validatedUserDTO);

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
  public static updateUserDTOWithBatch(updatedUserDTO: UserDTO, batch: WriteBatch) {
    const userRef = doc(db, PATH_TO_USERS_COLLECTION, updatedUserDTO.uuid);
    batch.update(userRef, updatedUserDTO);

    logToConsole(`UserService:updateUserDTOWithBatch: 1 ${RequestOperations.DELETE} operation`);
  }

}
