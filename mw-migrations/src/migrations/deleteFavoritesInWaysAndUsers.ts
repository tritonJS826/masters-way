import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase.js";
import { PATH_TO_USERS_COLLECTION, UsersService } from "../service/UsersService.js";
import { PATH_TO_WAYS_COLLECTION, WayService } from "../service/WayService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "usersMigration_delete_favoriteWayUuids_waysMigration_delete_favoriteForUserUuids"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

const deleteFavoritesInWaysAndUsers = async () => {
  const usersAndWaysMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all ways`)
  const ways = await WayService.getWaysDTO();
  log(`Got ${ways.length} ways`)

  log(`Getting all users`)
  const users = await UsersService.getUsersDTO();
  log(`Got ${users.length} users`)

  log(`start migrate ways one by one`)

  const batch = writeBatch(db);

  for (const way of ways) {
    const wayMigrationStartTime = new Date();

    try {
      log(`started ${way.uuid} migration`);

      const wayRef = doc(db, PATH_TO_WAYS_COLLECTION, way.uuid);
      batch.set(wayRef, {
        favoriteForUserUuids: [],
      });

      const wayMigrationEndTime = new Date();
      const wayMigrationTime = wayMigrationEndTime.getTime() - wayMigrationStartTime.getTime();
      log(`finished ${way.uuid} migration successfully in ${wayMigrationTime} ms`);
    } catch (error) {
      const wayMigrationEndTime = new Date();
      const wayMigrationTime = wayMigrationEndTime.getTime() - wayMigrationStartTime.getTime();
      log(`Error when migrating ${way.uuid} with error: ${(error as Error)?.message} (in ${wayMigrationTime} ms)`)
    }
  }

  log(`start migrate users one by one`)

  for (const user of users) {
    const userMigrationStartTime = new Date();

    try {
      log(`started ${user.uuid} migration`);

      const userRef = doc(db,PATH_TO_USERS_COLLECTION, user.uuid);
      batch.set(userRef, {
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

  await batch.commit();

  const usersAndWaysMigrationEndTime = new Date();
  const usersAndWaysMigrationTime = usersAndWaysMigrationEndTime.getTime() - usersAndWaysMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Add createdAt favoriteForUserUuids lastUpdate mentorUuids, deleted monthReportUuids currentMentorUuids
    
    Start time: ${usersAndWaysMigrationStartTime}
    End time: ${usersAndWaysMigrationEndTime}
    Total time: ${usersAndWaysMigrationTime} ms

    Total Models to changed: Users - ${users.length}, Ways - ${ways.length}
  `)
}

deleteFavoritesInWaysAndUsers()
