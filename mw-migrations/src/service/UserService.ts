import { collection, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";
import { db } from "../firebase.js";
import { UserDTOMigration, UserDTONew } from "../DTOModel/UserDTO.js";

export const PATH_TO_USERS_COLLECTION = "users";

/**
 * Provides methods to interact with the Users collection in Firestore.
 */
export class UserService {

  /**
   * Get UsersDTO
   */
  public static async getUsersDTO(): Promise<UserDTOMigration[]> {
    const usersRef = collection(db, PATH_TO_USERS_COLLECTION);
    const usersRaw = await getDocs(usersRef);
    const usersDTO = querySnapshotToDTOConverter<UserDTOMigration>(usersRaw);

    return usersDTO;
  }

  /**
   * Create UserDTO
   */
  public static async createUserDTO(userDTO: UserDTONew): Promise<UserDTONew> {
    const docRef = doc(collection(db, PATH_TO_USERS_COLLECTION));
    
    await setDoc(docRef, userDTO);
    
    return userDTO;
  }

  /**
   * Delete UserDTO
   */
  public static async deleteUserDTO(userUuid: string) {
    deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, userUuid));
  }

}