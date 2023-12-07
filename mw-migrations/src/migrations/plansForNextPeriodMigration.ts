import { deleteField, doc, writeBatch } from "firebase/firestore";
import { PlanForNextPeriodDTO } from "../DTOModel/PlanForNextPeriodDTO.js";
import { db } from "../firebase.js";
import { PlanForNextPeriodService } from "../service/PlanForNextPeriodService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "planForNextPeriodMigration_delete_timeUnit_and_add_tags"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Delete timeUnit and add tags properties to all plansForNextPeriod
 */
const migratePlansForNextPeriod = async () => {
  const plansForNextPeriodMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all plansForNextPeriod`)
  const allPlansForNextPeriod = await PlanForNextPeriodService.getPlansForNextPeriodDTO();
  log(`Got ${allPlansForNextPeriod.length} goals`)

  log(`Getting all plansForNextPeriod to migrate`);
  const plansForNextPeriodToMigrate: PlanForNextPeriodDTO[] = allPlansForNextPeriod.filter(planForNextPeriod => planForNextPeriod.timeUnit || !planForNextPeriod.tags)
  log(`Got ${plansForNextPeriodToMigrate.length} plansForNextPeriod to migrate`);

  log(`start migrate plansForNextPeriod one by one`)

  const batch = writeBatch(db);
  for (const planForNextPeriod of plansForNextPeriodToMigrate) {
    const plansForNextPeriodMigrationStartTime = new Date();
    try {
      log(`started ${planForNextPeriod.uuid} migration`);
      
      const plansForNextPeriodRef = doc(db, "plansForNextPeriod", planForNextPeriod.uuid);
      batch.update(plansForNextPeriodRef, {...planForNextPeriod, tags: [], timeUnit: deleteField()})

      const planForNextPeriodMigrationEndTime = new Date();
      const planForNextPeriodMigrationTime = planForNextPeriodMigrationEndTime.getTime() - plansForNextPeriodMigrationStartTime.getTime();
      log(`finished ${planForNextPeriod.uuid} migration successfully in ${planForNextPeriodMigrationTime} ms`);
    } catch (e) {
      const planForNextPeriodMigrationEndTime = new Date();
      const planForNextPeriodMigrationTime = planForNextPeriodMigrationEndTime.getTime() - plansForNextPeriodMigrationStartTime.getTime();
      log(`Error when migrating ${planForNextPeriod.uuid} with error: ${(e as Error)?.message} (in ${planForNextPeriodMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const plansForNextPeriodMigrationEndTime = new Date();
  const plansForNextPeriodMigrationTime = plansForNextPeriodMigrationEndTime.getTime() - plansForNextPeriodMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Delete timeUnit and add tags to PlanForNextPeriod collection
    
    Start time: ${plansForNextPeriodMigrationStartTime}
    End time: ${plansForNextPeriodMigrationEndTime}
    Total time: ${plansForNextPeriodMigrationTime} ms

    Total Models to changed: ${plansForNextPeriodToMigrate.length}
  `)
}

migratePlansForNextPeriod();
