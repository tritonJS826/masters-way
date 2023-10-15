import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {UserDTO} from "src/model/DTOModel/UserDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_USERS_COLLECTION = "users";

/**
 * Provides methods to interact with the Users collection in Firestore.
 */
export class UserService {

  /**
   * Get UsersDTO
   */
  public static async getUsersDTO(): Promise<UserDTO[]> {
    const usersRaw = await getDocs(collection(db, PATH_TO_USERS_COLLECTION));
    const users: UserDTO[] = querySnapshotToDTOConverter<UserDTO>(usersRaw);

    return users;
  }

  /**
   * Get UserDTO by Uuid
   */
  public static async getUserDTO(uuid: string): Promise<UserDTO> {
    const userRaw = await getDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
    const user: UserDTO = documentSnapshotToDTOConverter<UserDTO>(userRaw);

    return user;
  }

  /**
   * Create new user
   * @param data UserDTO
   */
  public static async createUserDTO(data: UserDTO) {
    await setDoc(doc(db, PATH_TO_USERS_COLLECTION, data.uuid), {
      uuid: data.uuid,
      email: data.email,
      name: data.name,
    });
  }

  /**
   * Update user
   * @param data UserDTO
   */
  public static async updateUserDTO(data: UserDTO) {
    await updateDoc(doc(db, PATH_TO_USERS_COLLECTION, data.uuid), {
      uuid: data.uuid,
      email: data.email,
      name: data.name,
      ownWays: data.ownWays,
      favoriteWays: data.favoriteWays,
      mentoringWays: data.mentoringWays,
    });
  }

  /**
   * Delete user
   * @param {string} uuid User's uuid
   */
  public static async deleteUserDTO(uuid: string) {
    await deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
  }

}