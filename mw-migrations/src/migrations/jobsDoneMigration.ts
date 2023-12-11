import { deleteField, doc, writeBatch } from "firebase/firestore";
import {JobDoneDTOMigration } from "../DTOModel/JobDoneDTO.js";
import { db } from "../firebase.js";
import { JobDoneService } from "../service/JobDoneService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "jobDoneMigration_delete_timeUnit_and_add_tags"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Delete timeUnit and add tags properties to all jobsDone
 */
const migrateJobsDone = async () => {
  const jobsDoneMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all jobsDone`)
  const allJobsDone = await JobDoneService.getJobsDoneDTO();
  log(`Got ${allJobsDone.length} goals`)

  log(`Getting all jobsDone to migrate`);
  const jobsDoneToMigrate: JobDoneDTOMigration[] = allJobsDone.filter(jobDone => jobDone.timeUnit || !jobDone.tags)
  log(`Got ${jobsDoneToMigrate.length} jobsDone to migrate`);

  log(`start migrate jobsDone one by one`)

  const batch = writeBatch(db);
  for (const jobDone of jobsDoneToMigrate) {
    const jobsDoneMigrationStartTime = new Date();
    try {
      log(`started ${jobDone.uuid} migration`);
      
      const jobsDoneRef = doc(db, "jobsDone", jobDone.uuid);
      batch.update(jobsDoneRef, {...jobDone, tags: [], timeUnit: deleteField()
      })

      const jobDoneMigrationEndTime = new Date();
      const jobDoneMigrationTime = jobDoneMigrationEndTime.getTime() - jobsDoneMigrationStartTime.getTime();
      log(`finished ${jobDone.uuid} migration successfully in ${jobDoneMigrationTime} ms`);
    } catch (e) {
      const jobDoneMigrationEndTime = new Date();
      const jobDoneMigrationTime = jobDoneMigrationEndTime.getTime() - jobsDoneMigrationStartTime.getTime();
      log(`Error when migrating ${jobDone.uuid} with error: ${(e as Error)?.message} (in ${jobDoneMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const jobsDoneMigrationEndTime = new Date();
  const jobsDoneMigrationTime = jobsDoneMigrationEndTime.getTime() - jobsDoneMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Delete timeUnit and add tags to JobDone collection
    
    Start time: ${jobsDoneMigrationStartTime}
    End time: ${jobsDoneMigrationEndTime}
    Total time: ${jobsDoneMigrationTime} ms

    Total Models to changed: ${jobsDoneToMigrate.length}
  `)
}

migrateJobsDone();
