import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {querySnapshotToUserDTOConverter} from "src/converter/userConverter";
import {db} from "src/firebase";
import {User as UserDTO} from "src/model/firebaseCollection/User";
import {PathToCollection} from "src/service/PathToCollection";

export class UserService {

  public static async getUsers(): Promise<UserDTO[]> {
    const usersRaw = await getDocs(collection(db, PathToCollection.users));
    const users = querySnapshotToUserDTOConverter(usersRaw);
    return users;
  }

  public static async addUser(data: UserDTO) {
    await setDoc(doc(db, PathToCollection.users, data.uuid), {
      uuid: data.uuid,
      email: data.email,
      name: data.name,
      ownWays: data.ownWays,
      favoriteWays: data.favoriteWays,
      mentoringWays: data.mentoringWays,
    });
  }

  public static async updateUser(data: UserDTO) {
    await updateDoc(doc(db, PathToCollection.users, data.uuid), {
      uuid: data.uuid,
      email: data.email,
      name: data.name,
      ownWays: data.ownWays,
      favoriteWays: data.favoriteWays,
      mentoringWays: data.mentoringWays,
    });
  }

  public static async deleteUser(uuid: string) {
    await deleteDoc(doc(db, PathToCollection.users, uuid));
  }

}