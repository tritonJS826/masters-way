import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {UserDTO} from "src/model/DTOModel/UserDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_USERS_COLLECTION = "users";

/**
 * Provides methods to interact with the Users collection in Firestore.
 */
export class UserService {

  /**
   * Read Users collection
   * @returns {Promise<UserDTO[]>} promise of UserDTO[]
   */
  public static async getUsersDTO(): Promise<UserDTO[]> {
    const usersRaw = await getDocs(collection(db, PATH_TO_USERS_COLLECTION));
    const users: UserDTO[] = querySnapshotToDTOConverter<UserDTO>(usersRaw);

    return users;
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