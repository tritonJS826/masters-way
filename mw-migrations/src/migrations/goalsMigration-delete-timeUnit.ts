import { deleteField, doc, writeBatch } from "firebase/firestore";
import { GoalDTO } from "../DTOModel/GoalDTO.js";
import { db } from "../firebase.js";
import { GoalService } from "../service/GoalService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "goalMigration_delete_timeUnit"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Delete timeUnit property to all goals
 */
const migrateGoals = async () => {
  const goalsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all goals`)
  const allGoals = await GoalService.getGoalsDTO();
  log(`Got ${allGoals.length} goals`)

  log(`Getting all goals to migrate`);
  const goalsToMigrate: GoalDTO[] = allGoals.filter(goal => goal.timeUnit)
  log(`Got ${goalsToMigrate.length} goals to migrate`);

  log(`start migrate goals one by one`)

  const batch = writeBatch(db);
  for (const goal of goalsToMigrate) {
    const goalMigrationStartTime = new Date();
    try {
      log(`started ${goal.uuid} migration`);
      
      const goalRef = doc(db, "goals", goal.uuid);
      batch.update(goalRef, {...goal, timeUnit: deleteField()})

      const goalMigrationEndTime = new Date();
      const goalMigrationTime = goalMigrationEndTime.getTime() - goalMigrationStartTime.getTime();
      log(`finished ${goal.uuid} migration successfully in ${goalMigrationTime} ms`);
    } catch (e) {
      const goalMigrationEndTime = new Date();
      const goalMigrationTime = goalMigrationEndTime.getTime() - goalMigrationStartTime.getTime();
      log(`Error when migrating ${goal.uuid} with error: ${(e as Error)?.message} (in ${goalMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const goalsMigrationEndTime = new Date();
  const goalsMigrationTime = goalsMigrationEndTime.getTime() - goalsMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Delete timeUnit to Goal collection
    
    Start time: ${goalsMigrationStartTime}
    End time: ${goalsMigrationEndTime}
    Total time: ${goalsMigrationTime} ms

    Total Models to changed: ${goalsToMigrate.length}
  `)
}

migrateGoals();
