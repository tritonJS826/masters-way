import { doc, writeBatch } from "firebase/firestore";
import { CurrentProblemDTOMigration } from "../DTOModel/CurrentProblemDTO.js";
import { db } from "../firebase.js";
import { CurrentProblemService } from "../service/CurrentProblemService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "currentProblemMigration_add_ownerUuid_and_tags"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Adds ownerUuid and tags properties to all currentProblems
 */
const migrateCurrentProblems = async () => {
  const currentProblemsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all currentProblems`)
  const allCurrentProblems = await CurrentProblemService.getCurrentProblemsDTO();
  log(`Got ${allCurrentProblems.length} currentProblems`)

  log(`Getting all currentProblems to migrate`);
  const currentProblemsToMigrate: CurrentProblemDTOMigration[] = allCurrentProblems.filter(currentProblem => !currentProblem.ownerUuid || !currentProblem.tags)
  log(`Got ${currentProblemsToMigrate.length} currentProblems to migrate`);

  log(`start migrate currentProblems one by one`)

  const batch = writeBatch(db);
  for (const currentProblem of currentProblemsToMigrate) {
    const currentProblemMigrationStartTime = new Date();
    try {
      log(`started ${currentProblem.uuid} migration`);
      
      const currentProblemRef = doc(db, "currentProblems", currentProblem.uuid);
      batch.set(currentProblemRef, {
        ...currentProblem,
        ownerUuid: "",
        tags: []
      });

      const currentProblemMigrationEndTime = new Date();
      const currentProblemMigrationTime = currentProblemMigrationEndTime.getTime() - currentProblemMigrationStartTime.getTime();
      log(`finished ${currentProblem.uuid} migration successfully in ${currentProblemMigrationTime} ms`);
    } catch (e) {
      const currentProblemMigrationEndTime = new Date();
      const currentProblemMigrationTime = currentProblemMigrationEndTime.getTime() - currentProblemMigrationStartTime.getTime();
      log(`Error when migrating ${currentProblem.uuid} with error: ${(e as Error)?.message} (in ${currentProblemMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const currentProblemsMigrationEndTime = new Date();
  const currentProblemsMigrationTime = currentProblemsMigrationEndTime.getTime() - currentProblemsMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Add ownerUuid and tags to CurrentProblem collection
    
    Start time: ${currentProblemsMigrationStartTime}
    End time: ${currentProblemsMigrationEndTime}
    Total time: ${currentProblemsMigrationTime} ms

    Total Models to changed: ${currentProblemsToMigrate.length}
  `)
}

migrateCurrentProblems();
