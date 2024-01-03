import { deleteField, doc, Timestamp, writeBatch } from "firebase/firestore";
import { DayReportDTO } from "../DTOModel/DayReportDTO.js";
import { db } from "../firebase.js";
import { DayReportService } from "../service/DayReportService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "dayReportMigration_delete_deprecated_fields"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * delete jobDoneUuids, planForNextPeriodUuids, problemForCurrentPeriodUuids, commentUuids properties to all dayReports
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
      batch.update(dayReportRef,
        {
          ...dayReport,
          date: deleteField(),
          jobDoneUuids: deleteField(),
          planForNextPeriodUuids: deleteField(),
          problemForCurrentPeriodUuids: deleteField(),
          commentUuids: deleteField(),
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
    Delete "jobDoneUuids", "planForNextPeriodUuids", "problemForCurrentPeriodUuids", "commentUuids" properties to all dayReports
    
    Start time: ${dayReportsMigrationStartTime}
    End time: ${dayReportsMigrationEndTime}
    Total time: ${dayReportsMigrationTime} ms

    Total Models to changed: ${dayReportsToMigrate.length}
  `)
}

migrateDayReports();
