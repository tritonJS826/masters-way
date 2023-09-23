import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {UserDTOToUserPreviewConverter} from "src/convertDTOToBusiness/userConverter";
import {db} from "src/firebase";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {UserDTO} from "src/model/firebaseCollection/UserDTO";

const PATH_TO_USERS_COLLECTION = "users";

export class UserService {

  public static async getUsers(): Promise<UserPreview[]> {
    const usersRaw = await getDocs(collection(db, PATH_TO_USERS_COLLECTION));
    const users = UserDTOToUserPreviewConverter(usersRaw);
    return users;
  }

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

  public static async deleteUser(uuid: string) {
    await deleteDoc(doc(db, PATH_TO_USERS_COLLECTION, uuid));
  }

}