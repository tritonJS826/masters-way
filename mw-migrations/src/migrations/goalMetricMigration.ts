import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase.js";
import { logToFile } from "../utils/logToFile.js";
import { GoalService } from "../service/GoalService.js";
import { GoalDTO } from "../DTOModel/GoalDTO.js";
import { GoalMetricService } from "../service/GoalMetricService.js";

const FILE_TO_LOG = "goalMetricMigration_add_uuid_metricUuids_description_isDone_doneDate";
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add uuid metricUuids description isDone doneDate properties to all goalMetric
 */
const migrateGoalMetric = async () => {
  const goalMetricsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all goals`)
  const allGoals = await GoalService.getGoalsDTO();
  log(`Got ${allGoals.length} goals`);

  log(`Getting all goals to migrate`);
  const goalsToMigrate: GoalDTO[] = allGoals;
  log(`Got ${goalsToMigrate.length} goals to migrate`);

  log(`start migrate goals, goalMetrics one by one`)

  const batch = writeBatch(db);
  for (const goal of goalsToMigrate) {
    const goalMigrationStartTime = new Date();
    try {
      log(`started goal.uuid:${goal.uuid} migration`);

      const goalMetricDTO = await GoalMetricService.createGoalMetricsDTO({
        metricUuids: [],
        description: [],
        isDone: [],
        doneDate: [],
      });
      const goalRef = doc(db, "goals", goal.uuid);

      batch.update(goalRef, {
        metricUuids: [goalMetricDTO.uuid]
      });
      const goalMetricRef = doc(db, "goalMetrics", goalMetricDTO.uuid);
      batch.set(goalMetricRef, {...goalMetricDTO, uuid: goalMetricDTO.uuid})

      const migrationEndTime = new Date();
      const migrationTime = migrationEndTime.getTime() - goalMigrationStartTime.getTime();
      log(`finished goal.uuid:${goal.uuid} migration successfully in ${migrationTime} ms`);
    } catch (e) {
      const migrationEndTime = new Date();
      const migrationTime = migrationEndTime.getTime() - goalMigrationStartTime.getTime();
      log(`Error when migrating goal.uuid:${goal.uuid} with error: ${(e as Error)?.message} (in ${migrationTime} ms)`)
    }
  }

  await batch.commit();

  const migrationEndTime = new Date();
  const migrationTime = migrationEndTime.getTime() - goalMetricsMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Add default goalMetric for each goal
    
    Start time: ${goalMetricsMigrationStartTime}
    End time: ${migrationEndTime}
    Total time: ${migrationTime} ms

    Total Goals Models to changed: ${goalsToMigrate.length}
    Total GoalMetrics Models to changed: ${goalsToMigrate.length}
  `)
}

migrateGoalMetric();