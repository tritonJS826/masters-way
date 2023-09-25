import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_USERS_COLLECTION = "users";

/**
 * Users requests
 */
export class UserService {

  /**
   * Read Users collection
   * @returns UserDTO[]
   */
  public static async getUsers(): Promise<UserDTO[]> {
    const usersRaw = await getDocs(collection(db, PATH_TO_USERS_COLLECTION));
    const users: UserDTO[] = querySnapshotToDTOConverter<UserDTO>(usersRaw);
    return users;
  }

  /**
   * Create new user
   * @param data UserDTO
   */
  public static async createUser(data: UserDTO) {
    await setDoc(doc(db, PATH_TO_USERS_COLLECTION, data.uuid), {
      uuid: data.uuid,
      email: data.email,
      name: data.name,
      ownWays: data.ownWays,
      favoriteWays: data.favoriteWays,
      mentoringWays: data.mentoringWays,
    });
  }

  /**
   * Update user
   * @param data UserDTO
   */
  public static async updateUser(data: UserDTO) {
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
   * @param uuid User's uuid
   */
  public static async deleteUser(uuid: string) {
    await deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
  }

}