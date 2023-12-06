import { WayDTO } from "../DTOModel/WayDTO.js";
import { WayService } from "../service/WayService.js";

import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "wayMigration_add_mentorRequestUuids"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Adds mentorRequestUuids property to all ways
 */
const migrateWays = async () => {
  const waysMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all ways`)
  const allWays = await WayService.getWaysDTO();
  log(`Got ${allWays.length} ways`)

  log(`Getting all ways to migrate`);
  const waysToMigrate: WayDTO[] = allWays.filter(way => !Array.isArray(way.mentorRequestUuids))
  log(`Got ${waysToMigrate.length} ways to migrate`);

  /** Add batching\transaction */
  log(`start migrate ways one by one`)
  for (const way of waysToMigrate) {
    const wayMigrationStartTime = new Date();
    try {
      log(`started ${way.uuid} migration`);
      // await WayService.updateWayDTO({...way, mentorRequestUuids: []});
      const wayMigrationEndTime = new Date();
      const wayMigrationTime = wayMigrationEndTime.getTime() - wayMigrationStartTime.getTime();
      log(`finished ${way.uuid} migration successfully in ${wayMigrationTime} ms`);
    } catch (e) {
      const wayMigrationEndTime = new Date();
      const wayMigrationTime = wayMigrationEndTime.getTime() - wayMigrationStartTime.getTime();
      log(`Error when migrating ${way.uuid} with error: ${(e as Error)?.message} (in ${wayMigrationTime} ms)`)
    }
  }

  const waysMigrationEndTime = new Date();
  const waysMigrationTime = waysMigrationEndTime.getTime() - waysMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Add mentorRequestUuids to Way collection
    
    Start time: ${waysMigrationStartTime}
    End time: ${waysMigrationEndTime}
    Total time: ${waysMigrationTime} ms

    Total Models to changed: ${waysToMigrate.length}
  `)
}

migrateWays();
