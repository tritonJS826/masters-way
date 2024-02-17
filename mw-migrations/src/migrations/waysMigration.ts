import { deleteField, doc, Timestamp, writeBatch } from "firebase/firestore";
import { WayDTO, WayDTOMigration } from "../DTOModel/WayDTO.js";
import { db } from "../firebase.js";
import { WayService } from "../service/WayService.js";
import { logToFile } from "../utils/logToFile.js";
import { GoalService } from "../service/GoalService.js";
import {v4 as uuidv4} from "uuid";
import { getColorByString } from "../utils/getColorByString.js";

const FILE_TO_LOG = "wayMigration_add_status"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add status property and delete isCompleted to all ways
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
  const waysToMigrate: WayDTOMigration[] = allWays;
  log(`Got ${waysToMigrate.length} ways to migrate`);

  log(`start migrate ways one by one`)

  const batch = writeBatch(db);
  for (const way of waysToMigrate) {
    const wayMigrationStartTime = new Date();

    try {
      log(`started ${way.uuid} migration`);
      
      const wayRef = doc(db, "ways", way.uuid);
      const status = way.isCompleted ? "Completed" : null;
      const wayTagsStringified = way.wayTags.map((wayTag) => {
        const wayTagUuid = uuidv4();
        return `{\"uuid\":\"${wayTagUuid}\",\"name\":\"${wayTag}\"}`;
      })
      const jobTagsStringified = way.jobTags.map((jobTag) => {
        const jobTagUuid = uuidv4();
        const color = getColorByString(jobTag);
        return `{\"uuid\":\"${jobTagUuid}\",\"name\":\"${jobTag}\",\"description\":\"\",\"color\":\"${color}\"}`;
      });

      batch.update(wayRef, {
        status: status,
        isCompleted: deleteField(),
        wayTagsStringified,
        wayTags: deleteField(),
        jobTagsStringified,
        jobTags: deleteField(),
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
    Add "status" property and delete "isCompleted" to all Ways
    
    Start time: ${waysMigrationStartTime}
    End time: ${waysMigrationEndTime}
    Total time: ${waysMigrationTime} ms

    Total Models to changed: ${waysToMigrate.length}
  `)
}

migrateWays();
