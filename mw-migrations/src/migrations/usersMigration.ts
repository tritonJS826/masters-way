import { doc, Timestamp, writeBatch } from "firebase/firestore";
import { WayDTO } from "../DTOModel/WayDTO.js";
import { db } from "../firebase.js";
import { WayService } from "../service/WayService.js";
import { logToFile } from "../utils/logToFile.js";
import { UserService } from "../service/UserService.js";

const FILE_TO_LOG = "wayMigration_add_formerMentorUuids"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add customWayCollectionsStringified property to all users
 */
const migrateUsers = async () => {
  const usersMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all users`)
  const allUsers = await UserService.getUsersDTO();
  log(`Got ${allUsers.length} users`)

  log(`Getting all users to migrate`);
  const usersToMigrate = allUsers.filter(user => !Array.isArray(user.customWayCollectionsStringified));
  log(`Got ${usersToMigrate.length} users to migrate`);

  log(`start migrate users one by one`)

  const batch = writeBatch(db);
  for (const user of usersToMigrate) {
    const userMigrationStartTime = new Date();
    try {
      log(`started ${user.uuid} migration`);
      
      const userRef = doc(db, "users", user.uuid);
      batch.update(userRef, {
        customWayCollectionsStringified: [],
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
    Add "customWayCollectionsStringified" field to the User documents
    
    Start time: ${usersMigrationStartTime}
    End time: ${usersMigrationEndTime}
    Total time: ${usersMigrationTime} ms

    Total Models to changed: ${usersToMigrate.length}
  `)
}

migrateUsers();
