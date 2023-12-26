import { WriteBatch, doc } from "firebase/firestore";
import { PATH_TO_USERS_COLLECTION, UsersService } from "../service/UsersService.js";
import { db } from "../firebase.js";

export const updateUsersFavorites = async (
  batch: WriteBatch,
  log: (textToLog: string) => void
) => {
  log(`Getting all users`)
  const users = await UsersService.getUsersDTO();
  log(`Got ${users.length} users`)

  log(`start migrate users one by one`)

  for (const user of users) {
    const userMigrationStartTime = new Date();

    try {
      log(`started ${user.uuid} migration`);

      const userRef = doc(db,PATH_TO_USERS_COLLECTION, user.uuid);
      batch.update(userRef, {
        favoriteWayUuids: [],
      });

      const userMigrationEndTime = new Date();
      const userMigrationTime = userMigrationEndTime.getTime() - userMigrationStartTime.getTime();
      log(`finished ${user.uuid} migration successfully in ${userMigrationTime} ms`);
    } catch (error) {
      const userMigrationEndTime = new Date();
      const userMigrationTime = userMigrationEndTime.getTime() - userMigrationStartTime.getTime();
      log(`Error when migrating ${user.uuid} with error: ${(error as Error)?.message} (in ${userMigrationTime} ms)`)
    }
  }

  return users.length;
}
