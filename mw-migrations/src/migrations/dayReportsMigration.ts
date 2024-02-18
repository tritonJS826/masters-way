import { Timestamp, deleteField, doc, writeBatch } from "firebase/firestore";
import { DayReportDTOMigration } from "../DTOModel/DayReportDTO.js";
import { db } from "../firebase.js";
import { DayReportService } from "../service/DayReportService.js";
import { logToFile } from "../utils/logToFile.js";
import { JobDoneDTOMigration, JobTagDTOMigration } from "../DTOModel/JobDoneDTO.js";
import { CurrentProblemDTOMigration } from "../DTOModel/CurrentProblemDTO.js";
import { PlanForNextPeriodDTOMigration } from "../DTOModel/PlanForNextPeriodDTO.js";
import {v4 as uuidv4} from "uuid";
import { getColorByString } from "../utils/getColorByString.js";
import { WayService } from "../service/WayService.js";
import { CommentDTOMigration } from "../DTOModel/CommentDTO.js";

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

  log(`Getting all ways`)
  const allWays = await WayService.getWaysDTO();
  log(`Got ${allWays.length} ways`)

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

      const way = allWays.find((way) => way.dayReportUuids.includes(dayReport.uuid));

      if (way) {
      const wayJobDoneParsed = way.jobTagsStringified.map((item) => JSON.parse(item));

      const jobsDone = dayReport.jobsDoneStringified.map((jobDoneStringified) => {
        const jobDoneParsed: JobDoneDTOMigration = JSON.parse(jobDoneStringified);

        const jobTags = jobDoneParsed.tags.map((jobTag) => {
          const jobTagUuid = uuidv4();
          const color = getColorByString(jobTag);
          const jobTagUuid2 = wayJobDoneParsed.find((item) => item.name === jobTag)?.uuid ?? uuidv4();
          if (jobDoneParsed.tags.length > 1 && jobTag === "no tag") {
            return;
          }
          return {
            name: jobTag,
            uuid: jobTagUuid2,
            description: "",
            color: color,
          }
        });

        const jobTagsWithoutNull = jobTags.filter(item => item);

        const jobDone = {
          ...jobDoneParsed,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          ownerUuid: way?.ownerUuid,
          tags: jobTagsWithoutNull,
        }

        return jobDone;
      });

      const plans = dayReport.plansStringified.map((planStringified) => {
        const planParsed: PlanForNextPeriodDTOMigration = JSON.parse(planStringified);

        const plansTags = planParsed.tags.map((planTag) => {
          const planTagUuid = uuidv4();
          const color = getColorByString(planTag);
          const planTagUuid2 = wayJobDoneParsed.find((item) => item.name === planTag)?.uuid ?? uuidv4();
          // const color = way?.jobTags.find((item) => item.name === planTag)?.color;

          if (planParsed.tags.length > 1 && planTag === "no tag") {
            return;
          }

          return {
            name: planTag,
            uuid: planTagUuid2,
            description: "",
            color: color,
          }
        });

        const planTagsWithoutNull = plansTags.filter(item => item);

        const plan = {
          ...planParsed,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          isDone: false,
          tags: planTagsWithoutNull,
        }

        return plan;
      });
      const problems = dayReport.problemsStringified.map((problemStringified) => {
        const problemParsed: CurrentProblemDTOMigration = JSON.parse(problemStringified);

        const problemsTags = problemParsed.tags.map((problemTag) => {
          const problemTagUuid = uuidv4();
          const color = getColorByString(problemTag);
          const problemTagUuid2 = wayJobDoneParsed.find((item) => item.name === problemTag)?.uuid ?? uuidv4();
          // const color = way?.jobTags.find((item) => item.name === problemTag)?.color;

          if (problemParsed.tags.length > 1 && problemTag === "no tag") {
            return;
          }

          return {
            name: problemTag,
            uuid: problemTagUuid2,
            description: "",
            color: color,
          }
        });

        const problemTagsWithoutNull = problemsTags.filter(item => item);

        const problem = {
          ...problemParsed,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          tags: problemTagsWithoutNull,
        }

        return problem;
      });

      const comments = dayReport.commentsStringified.map((commentStringified) => {
        const commentParsed: CommentDTOMigration = JSON.parse(commentStringified);

        const updatedComment = {
          uuid: commentParsed.uuid,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          description: commentParsed.description,
          ownerUuid: commentParsed.ownerUuid,
        }

        return updatedComment;
      })

      batch.update(dayReportRef, {
        jobsDoneStringified: jobsDone.map((jobDone) => JSON.stringify(jobDone)),
        plansStringified: plans.map((plan) => JSON.stringify(plan)),
        problemsStringified: problems.map((problem) => JSON.stringify(problem)),
        commentsStringified: comments.map((comment) => JSON.stringify(comment)),
        updatedAt: Timestamp.fromDate(new Date()),
        })

      }
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
