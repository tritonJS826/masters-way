import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {User as UserDTO} from "src/model/firebaseCollection/User";

const PATH_TO_USERS_COLLECTION = "users";
export class UserService {

  public static async getUsers(callBack: (data: UserDTO[]) => void) {
    const usersRaw = await getDocs(collection(db, PATH_TO_USERS_COLLECTION));
    const users: UserDTO[] = usersRaw.docs.map((userRaw) => ({
      name: userRaw.data().name,
      email: userRaw.data().email,
      uuid: userRaw.data().uuid,
      ownWays: userRaw.data().ownWays,
      mentoringWays: userRaw.data().mentoringWays,
      favoriteWays: userRaw.data().favoriteWays,
    }));
    callBack(users);
  }

  public static async addUser(data: UserDTO) {
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