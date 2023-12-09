import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {UserDTO, UserDTOSchema, UsersDTOSchema} from "src/model/DTOModel/UserDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

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

    return validatedUsersDTO;
  }

  /**
   * Get UserDTO by Uuid
   */
  public static async getUserDTO(uuid: string): Promise<UserDTO> {
    const userRaw = await getDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
    const userDTO = documentSnapshotToDTOConverter<UserDTO>(userRaw);

    const validatedUserDTO = UserDTOSchema.parse(userDTO);

    return validatedUserDTO;
  }

  /**
   * Create new user
   * @param userDTO UserDTO
   */
  public static async createUserDTO(userDTO: UserDTO) {
    const validatedUserDTO = UserDTOSchema.parse(userDTO);

    await setDoc(doc(db, PATH_TO_USERS_COLLECTION, userDTO.uuid), validatedUserDTO);
  }

  /**
   * Update user
   * @param userDTO UserDTO
   */
  public static async updateUserDTO(userDTO: UserDTO) {
    const validatedUserDTO = UserDTOSchema.parse(userDTO);

    await updateDoc(doc(db, PATH_TO_USERS_COLLECTION, userDTO.uuid), validatedUserDTO);
  }

  /**
   * Delete user
   * @param {string} uuid User's uuid
   */
  public static async deleteUserDTO(uuid: string) {
    await deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
  }

}