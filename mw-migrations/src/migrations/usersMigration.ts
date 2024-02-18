import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase.js";
import { logToFile } from "../utils/logToFile.js";
import { UserService } from "../service/UserService.js";

const FILE_TO_LOG = "userMigration_add_tagsStringified_imageUrl_isMentor_wayRequestUuids"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add "tagsStringified","imageUrl","isMentor", "wayRequestUuids" properties to all users
 */
const migrateUsers = async () => {
  const usersMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all users`)
  const allUsers = await UserService.getUsersDTO();
  log(`Got ${allUsers.length} users`)

  log(`Getting all users to migrate`);
  const usersToMigrate = allUsers;
  log(`Got ${usersToMigrate.length} users to migrate`);

  log(`start migrate users one by one`)

  const batch = writeBatch(db);
  for (const user of usersToMigrate) {
    const userMigrationStartTime = new Date();
    try {
      log(`started ${user.uuid} migration`);
      
      const userRef = doc(db, "users", user.uuid);

      const wayCollections = user.customWayCollectionsStringified.map((item) => JSON.parse(item));

      const updatedWayCollections = wayCollections.map((item) => {
        return {
          uuid: item.id,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          name: item.name,
          wayUuids: item.wayUuids,
        }
      })


      batch.update(userRef, {
        tagsStringified: [],
        imageUrl: "",
        isMentor: false,
        wayRequestUuids: [],
      });

      const userMigrationEndTime = new Date();
      const userMigrationTime = userMigrationEndTime.getTime() - userMigrationStartTime.getTime();
      log(`finished ${user.uuid} migration successfully in ${userMigrationTime} ms`);
    } catch (e) {
      const userMigrationEndTime = new Date();
      const userMigrationTime = userMigrationEndTime.getTime() - userMigrationStartTime.getTime();
      log(`Error when migrating ${user.uuid} with error: ${(e as Error)?.message} (in ${userMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const usersMigrationEndTime = new Date();
  const usersMigrationTime = usersMigrationEndTime.getTime() - usersMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Add "tagsStringified","imageUrl","isMentor", "wayRequestUuids" fields to the User documents
    
    Start time: ${usersMigrationStartTime}
    End time: ${usersMigrationEndTime}
    Total time: ${usersMigrationTime} ms

    Total Models to changed: ${usersToMigrate.length}
  `)
}

migrateUsers();
