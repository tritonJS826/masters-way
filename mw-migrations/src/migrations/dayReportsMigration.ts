import { Timestamp, deleteField, doc, writeBatch } from "firebase/firestore";
import { DayReportDTOMigration } from "../DTOModel/DayReportDTO.js";
import { db } from "../firebase.js";
import { DayReportService } from "../service/DayReportService.js";
import { logToFile } from "../utils/logToFile.js";
import { JobDoneDTOMigration, JobTag, JobTagDTOMigration } from "../DTOModel/JobDoneDTO.js";
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
        const jobTagsParsed = way.jobTagsStringified.map((tag) => JSON.parse(tag));
        const noTag = jobTagsParsed.find((tag: JobTag) => tag.name === "no tag");

      const jobsDone = dayReport.jobsDoneStringified.map((jobDoneStringified) => {
        const jobDoneParsed: JobDoneDTOMigration = JSON.parse(jobDoneStringified);

        const jobTags = jobDoneParsed.tags.map((jobTag) => {
          if (jobTag.name === "no tag") {
            return {
              ...jobTag,
              uuid: noTag.uuid,
            };
          } else {
            return jobTag;
          }
        });

        const jobTagsWithoutNull = jobTags.filter(item => item);

        const jobDone = {
          ...jobDoneParsed,
          tags: jobTagsWithoutNull,
        }

        return jobDone;
      });

      const plans = dayReport.plansStringified.map((planStringified) => {
        const planParsed: PlanForNextPeriodDTOMigration = JSON.parse(planStringified);

        const plansTags = planParsed.tags.map((planTag) => {
          if (planTag.name === "no tag") {
            return {
              ...planTag,
              uuid: noTag.uuid,
            };
          }  else {
            return planTag;
          }
        });

        const planTagsWithoutNull = plansTags.filter(item => item);

        const plan = {
          ...planParsed,
          tags: planTagsWithoutNull,
        }

        return plan;
      });

      batch.update(dayReportRef, {
        jobsDoneStringified: jobsDone.map((jobDone) => JSON.stringify(jobDone)),
        plansStringified: plans.map((plan) => JSON.stringify(plan)),
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
