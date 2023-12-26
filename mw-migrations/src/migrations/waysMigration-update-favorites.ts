import { WriteBatch, doc } from "firebase/firestore";
import { PATH_TO_WAYS_COLLECTION, WayService } from "../service/WayService.js";
import { db } from "../firebase.js";

export const updateWaysFavorites = async (
  batch: WriteBatch,
  log: (textToLog: string) => void
) => {
  log(`Getting all ways`)
  const ways = await WayService.getWaysDTO();
  log(`Got ${ways.length} ways`)

  log(`start migrate ways one by one`)

  for (const way of ways) {
    const wayMigrationStartTime = new Date();

    try {
      log(`started ${way.uuid} migration`);

      const wayRef = doc(db, PATH_TO_WAYS_COLLECTION, way.uuid);
      batch.update(wayRef, {
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

  return ways.length;
}
