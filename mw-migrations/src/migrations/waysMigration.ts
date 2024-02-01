import { deleteField, doc, Timestamp, writeBatch } from "firebase/firestore";
import { WayDTO } from "../DTOModel/WayDTO.js";
import { db } from "../firebase.js";
import { WayService } from "../service/WayService.js";
import { logToFile } from "../utils/logToFile.js";
import { GoalService } from "../service/GoalService.js";

const FILE_TO_LOG = "wayMigration_add_goalDescription_metricsStringified_estimationTime"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add goalDescription, metricsStringified, estimationTime properties and delete goalUuid to all ways
 */
const migrateWays = async () => {
  const waysMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all ways`)
  const allWays = await WayService.getWaysDTO();
  log(`Got ${allWays.length} ways`)

  log(`Getting all goals`)
  const allGoals = await GoalService.getGoalsDTO();
  log(`Got ${allWays.length} goals`)

  log(`Getting all ways to migrate`);
  const waysToMigrate: WayDTO[] = allWays;
  log(`Got ${waysToMigrate.length} ways to migrate`);

  log(`start migrate ways one by one`)

  const batch = writeBatch(db);
  for (const way of waysToMigrate) {
    const wayMigrationStartTime = new Date();

    const goal = allGoals.find((item) => item.uuid === way.goalUuid);
    if (!goal) {
      console.log(`Goal with uuid ${way.goalUuid} is not exist`);
      throw new Error("Error");
    }

    try {
      log(`started ${way.uuid} migration`);
      
      const wayRef = doc(db, "ways", way.uuid);
      batch.update(wayRef, {
        goalDescription: goal.description,
        metricsStringified: goal.metricsStringified,
        estimationTime: 0,
        goalUuid: deleteField(),
      });

      const wayMigrationEndTime = new Date();
      const wayMigrationTime = wayMigrationEndTime.getTime() - wayMigrationStartTime.getTime();
      log(`finished ${way.uuid} migration successfully in ${wayMigrationTime} ms`);
    } catch (e) {
      const wayMigrationEndTime = new Date();
      const wayMigrationTime = wayMigrationEndTime.getTime() - wayMigrationStartTime.getTime();
      log(`Error when migrating ${way.uuid} with error: ${(e as Error)?.message} (in ${wayMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const waysMigrationEndTime = new Date();
  const waysMigrationTime = waysMigrationEndTime.getTime() - waysMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Add "goalDescription", "metricsStringified", "estimationTime" properties and delete "goalUuid" to all Ways
    
    Start time: ${waysMigrationStartTime}
    End time: ${waysMigrationEndTime}
    Total time: ${waysMigrationTime} ms

    Total Models to changed: ${waysToMigrate.length}
  `)
}

migrateWays();
