import { doc, writeBatch } from "firebase/firestore";
import { DayReportDTOMigration } from "../DTOModel/DayReportDTO.js";
import { db } from "../firebase.js";
import { DayReportService } from "../service/DayReportService.js";
import { logToFile } from "../utils/logToFile.js";
import { JobDoneDTOMigration } from "../DTOModel/JobDoneDTO.js";
import { CurrentProblemDTOMigration } from "../DTOModel/CurrentProblemDTO.js";
import { PlanForNextPeriodDTOMigration } from "../DTOModel/PlanForNextPeriodDTO.js";

const FILE_TO_LOG = "dayReportMigration_update_jobTags"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * UpdateJobTags to all dayReports
 */
const migrateDayReports = async () => {
  const dayReportsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all day reports`)
  const allDayReports = await DayReportService.getDayReportsDTO();
  log(`Got ${allDayReports.length} day reports`)

  log(`Getting all day reports to migrate`);
  const dayReportsToMigrate: DayReportDTOMigration[] = allDayReports;
  log(`Got ${dayReportsToMigrate.length} dayReports to migrate`);

  log(`start migrate dayReports one by one`)

  const batch = writeBatch(db);
  for (const dayReport of dayReportsToMigrate) {
    const dayReportMigrationStartTime = new Date();
    try {
      log(`started ${dayReport.uuid} migration`);
      
      const dayReportRef = doc(db, "dayReports", dayReport.uuid);

      const jobsDone: JobDoneDTOMigration[] = dayReport.jobsDoneStringified.map((jobDone) => JSON.parse(jobDone));
      const plans: PlanForNextPeriodDTOMigration[] = dayReport.plansStringified.map((plan) => JSON.parse(plan));
      const problems: CurrentProblemDTOMigration[] = dayReport.problemsStringified.map((problem) => JSON.parse(problem));

      const jobsDoneUpdated = jobsDone.map((jobDone) => {
        return {
          ...jobDone,
          tags: jobDone.tags.length === 0
            ? ["no tag"]
            : jobDone.tags.length === 1
              ? jobDone.tags
              : jobDone.tags.filter((tag) => tag !== "no tag")
        }
      })

      const plansUpdated = plans.map((plan) => {
        return {
          ...plan,
          tags: plan.tags.length === 0
            ? ["no tag"]
            : plan.tags.length === 1
              ? plan.tags
              : plan.tags.filter((tag) => tag !== "no tag")
        }
      })

      const problemsUpdated = problems.map((problem) => {
        return {
          ...problem,
          tags: problem.tags.length === 0
            ? ["no tag"]
            : problem.tags.length === 1
              ? problem.tags
              : problem.tags.filter((tag) => tag !== "no tag")
        }
      })

      batch.update(dayReportRef,
        {
          jobsDoneStringified: jobsDoneUpdated.map((jobDone) => JSON.stringify(jobDone)),
          plansStringified: plansUpdated.map((plan) => JSON.stringify(plan)),
          problemsStringified: problemsUpdated.map((problem) => JSON.stringify(problem)),
        })

      const dayReportMigrationEndTime = new Date();
      const dayReportMigrationTime = dayReportMigrationEndTime.getTime() - dayReportMigrationStartTime.getTime();
      log(`finished ${dayReport.uuid} migration successfully in ${dayReportMigrationTime} ms`);
    } catch (e) {
      const dayReportMigrationEndTime = new Date();
      const dayReportMigrationTime = dayReportMigrationEndTime.getTime() - dayReportMigrationStartTime.getTime();
      log(`Error when migrating ${dayReport.uuid} with error: ${(e as Error)?.message} (in ${dayReportMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const dayReportsMigrationEndTime = new Date();
  const dayReportsMigrationTime = dayReportsMigrationEndTime.getTime() - dayReportsMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Update "tags" field inside "JobsDone", "Plans", "Problems" fields in DayReport collection
    
    Start time: ${dayReportsMigrationStartTime}
    End time: ${dayReportsMigrationEndTime}
    Total time: ${dayReportsMigrationTime} ms

    Total Models to changed: ${dayReportsToMigrate.length}
  `)
}

migrateDayReports();
