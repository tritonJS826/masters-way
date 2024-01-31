import { deleteField, doc, writeBatch } from "firebase/firestore";
import { GoalDTO } from "../DTOModel/GoalDTO.js";
import { db } from "../firebase.js";
import { GoalService } from "../service/GoalService.js";
import { logToFile } from "../utils/logToFile.js";
import { GoalMetricService } from "../service/GoalMetricService.js";
import { GoalMetricDTOMigration, GoalMetricDTONew } from "../DTOModel/GoalMetricDTO.js";

const FILE_TO_LOG = "goalMigration_add_metricsStringified"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add metricsStringified property to all goals
 */
const migrateGoals = async () => {
  const goalsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all goals`)
  const allGoals = await GoalService.getGoalsDTO();
  log(`Got ${allGoals.length} goals`)

  log(`Getting all goalMetrics`)
  const allGoalMetrics = await GoalMetricService.getGoalMetricsDTO();
  log(`Got ${allGoalMetrics.length} goalMetrics`)

  log(`Getting all goals to migrate`);
  const goalsToMigrate = allGoals;
  log(`Got ${goalsToMigrate.length} goals to migrate`);

  log(`start migrate goals one by one`)

  const batch = writeBatch(db);
  for (const goal of goalsToMigrate) {
    const goalMigrationStartTime = new Date();
    try {
      log(`started ${goal.uuid} migration`);
      
      const goalRef = doc(db, "goals", goal.uuid);

      const goalMetric = allGoalMetrics.find((item) => item.uuid === goal.metricUuids[0]);

      let objArr: GoalMetricDTOMigration[] = Array(goalMetric?.description.length).fill(null);

      if (!goalMetric) {
        console.log("goalMetric is not exist");
        throw new Error("Goal metric is not exist")
      }

      for (let i = 0; i < goalMetric.description.length; i++) {
        objArr[i] = {
          uuid: goalMetric.metricUuids[i],
          description: goalMetric.description[i],
          isDone: goalMetric.isDone[i],
          doneDate: goalMetric.doneDate[i].toDate().getTime(),
          }
        }

      console.log(objArr);

      batch.update(goalRef, {
        ...goal,
        metricsStringified: objArr.map((item) => JSON.stringify(item)),
      })

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
    Add "metricsStringified" field to Goal collection
    
    Start time: ${goalsMigrationStartTime}
    End time: ${goalsMigrationEndTime}
    Total time: ${goalsMigrationTime} ms

    Total Models to changed: ${goalsToMigrate.length}
  `)
}

migrateGoals();
