import { collection, doc, deleteDoc, getDocs, setDoc } from "firebase/firestore";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";
import { db } from "../firebase.js";
import { UserDTOMigration, UserDTOBackup } from "../DTOModel/UserDTO.js";
import { Timestamp } from "firebase/firestore";
import { truncateToThreeChars } from "../utils/truncateToThreeChars.js";

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
  public static async createUserDTO(userDTO: UserDTOBackup): Promise<UserDTOBackup> {
    const docRef = doc(collection(db, PATH_TO_USERS_COLLECTION));

    await setDoc(docRef, userDTO);
    
    return userDTO;
  }

  /**
   * For import purposes
   */
  public static async importUser(user: UserDTOBackup): Promise<UserDTOBackup> {
    const createdAtNanoseconds = truncateToThreeChars(user.createdAt.nanoseconds);

    const createdAtTimestamp = Number(`${user.createdAt.seconds}${createdAtNanoseconds}`);
    const createdAt = new Date(createdAtTimestamp);

    const userToImport = {
      ...user,
      createdAt: Timestamp.fromDate(createdAt),
    };

    await setDoc(doc(db, PATH_TO_USERS_COLLECTION, user.uuid), userToImport);

    return user;
  }

  /**
   * Delete UserDTO
   */
  public static async deleteUserDTO(userUuid: string) {
      await deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, userUuid))
      
  }

}