import { doc, Timestamp, writeBatch } from "firebase/firestore";
import { DayReportDTO } from "../DTOModel/DayReportDTO.js";
import { db } from "../firebase.js";
import { CommentService } from "../service/CommentService.js";
import { CurrentProblemService } from "../service/CurrentProblemService.js";
import { DayReportService } from "../service/DayReportService.js";
import { JobDoneService } from "../service/JobDoneService.js";
import { PlanForNextPeriodService } from "../service/PlanForNextPeriodService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "dayReportMigration_add_jobsDone_Plans_Problems_Comments"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add jobsDone, plans, problem, comments properties to all dayReports
 */
const migrateDayReports = async () => {
  const dayReportsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all day reports`)
  const allDayReports = await DayReportService.getDayReportsDTO();
  log(`Got ${allDayReports.length} day reports`)

  log(`Getting all day reports to migrate`);
  const dayReportsToMigrate: DayReportDTO[] = allDayReports;
  log(`Got ${dayReportsToMigrate.length} dayReports to migrate`);

  log(`start migrate dayReports one by one`)

  const batch = writeBatch(db);
  for (const dayReport of dayReportsToMigrate) {
    const dayReportMigrationStartTime = new Date();
    try {
      log(`started ${dayReport.uuid} migration`);
      
      const dayReportRef = doc(db, "dayReports", dayReport.uuid);
      const jobsDonePromise = Promise.all(dayReport.jobDoneUuids.map(JobDoneService.getJobDoneDTO));
      const plansPromise = Promise.all(dayReport.planForNextPeriodUuids.map((PlanForNextPeriodService.getPlanForNextPeriodDTO)));
      const problemsPromise = Promise.all(dayReport.problemForCurrentPeriodUuids.map(CurrentProblemService.getProblemDTO));
      const commentsPromise = Promise.all(dayReport.commentUuids.map(CommentService.getCommentDTO));

      const [jobsDone, plans, problems, comments] = await Promise.all([jobsDonePromise, plansPromise, problemsPromise, commentsPromise]);

      batch.set(dayReportRef,
        {
          uuid: dayReport.uuid,
          createdAt: dayReport.date,
          jobsDoneStringified: jobsDone.map((jobDone) => JSON.stringify(jobDone)),
          plansStringified: plans.map((plan) => JSON.stringify(plan)),
          problemsStringified: problems.map((problem) => JSON.stringify(problem)),
          commentsStringified: comments.map((comment) => JSON.stringify(comment)),
          date: dayReport.date,
          jobDoneUuids: dayReport.jobDoneUuids,
          planForNextPeriodUuids: dayReport.planForNextPeriodUuids,
          currentProblemUuids: dayReport.problemForCurrentPeriodUuids,
          commentUuids: dayReport.commentUuids,
          isDayOff: dayReport.isDayOff,
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
    Add to DayReport model "jobsDoneStringified" field, "plansStringified" fields,"problemsStringified" field, "commentsStringified" field that will include stringified info from collections JobsDone, PlansForNextPeriod, CurrentProblem, Comments
    
    Start time: ${dayReportsMigrationStartTime}
    End time: ${dayReportsMigrationEndTime}
    Total time: ${dayReportsMigrationTime} ms

    Total Models to changed: ${dayReportsToMigrate.length}
  `)
}

migrateDayReports();
