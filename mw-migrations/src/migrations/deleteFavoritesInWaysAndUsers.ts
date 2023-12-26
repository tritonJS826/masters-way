import { writeBatch } from "firebase/firestore";
import { db } from "../firebase.js";
import { logToFile } from "../utils/logToFile.js";
import { updateUsersFavorites } from "./updateUsersFavorites.js";
import { updateWaysFavorites } from "./updateWaysFavorites.js";

const FILE_TO_LOG = "usersMigration_delete_favoriteWayUuids_waysMigration_delete_favoriteForUserUuids"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

const deleteFavoritesInWaysAndUsers = async () => {
  const usersAndWaysMigrationStartTime = new Date();
  log(`Migration started`);

  const batch = writeBatch(db);

  const amountOfUsers = await updateUsersFavorites(batch, log);
  const amountOfWays = await updateWaysFavorites(batch, log);

  await batch.commit();

  const usersAndWaysMigrationEndTime = new Date();
  const usersAndWaysMigrationTime = usersAndWaysMigrationEndTime.getTime() - usersAndWaysMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Delete favorites for users and ways
    
    Start time: ${usersAndWaysMigrationStartTime}
    End time: ${usersAndWaysMigrationEndTime}
    Total time: ${usersAndWaysMigrationTime} ms

    Total Models to changed: Users - ${amountOfUsers}, Ways - ${amountOfWays}
  `)
}

deleteFavoritesInWaysAndUsers()
