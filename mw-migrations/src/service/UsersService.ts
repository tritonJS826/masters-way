import { collection, getDocs } from "firebase/firestore";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";
import { db } from "../firebase.js";
import { UserDTOMigration } from "../DTOModel/UserDTO.js";

export const PATH_TO_USERS_COLLECTION = "users";

/**
 * Provides methods to interact with the Users collection in Firestore.
 */
export class UsersService {

  /**
   * Get UsersDTO
   */
  public static async getUsersDTO(): Promise<UserDTOMigration[]> {
    const usersRef = collection(db, PATH_TO_USERS_COLLECTION);
    const usersRaw = await getDocs(usersRef);
    const usersDTO = querySnapshotToDTOConverter<UserDTOMigration>(usersRaw);

    return usersDTO;
  }

}