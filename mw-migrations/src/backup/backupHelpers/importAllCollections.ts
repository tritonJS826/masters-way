import { DayReportService } from "../../service/DayReportService.js";
import { UserService } from "../../service/UserService.js";
import { WayService } from "../../service/WayService.js";
import { logToFile } from "../../utils/logToFile.js";
import { clearAllCollections } from "./clearAllCollections.js";
import { LOG_FILE,
  DAY_REPORTS_BACKUP_FILE,
  USERS_BACKUP_FILE,
  WAYS_BACKUP_FILE
} from "./exportAllCollections.js"
import * as fs from "fs";

const getBackupByName = (name: string) => {
  const filePath = `backups/${name}.json`;
  const backupData = fs.readFileSync(filePath, {encoding: 'utf-8'});

  return backupData;
}

const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, LOG_FILE);


/**
 * DON'T RUN THIS SCRIPT!!! IT COULD KILL OUR FIREBASE
 * 
 * Also there is a limit for http request size - 10 Mb, so it will work only for now
 * should be fixed before productions
 */
export const importToFirebase = async () => {
  
  await clearAllCollections();
  log('All collections cleared');

  const readDataStartTime = new Date();
  const dayReports = JSON.parse(getBackupByName(DAY_REPORTS_BACKUP_FILE));
  const users = JSON.parse(getBackupByName(USERS_BACKUP_FILE));
  const ways = JSON.parse(getBackupByName(WAYS_BACKUP_FILE));
  
  const readDataEndTime = new Date();
  const totalReadTime = readDataEndTime.getTime() -readDataStartTime.getDate(); 
  
  
  const importStartTime = new Date();
  
  const importDayReportsPromise = dayReports.map(DayReportService.importDayReport)
  const importUsersPromise = users.map(UserService.importUser);
  const importWaysPromise = ways.map(WayService.importWay);

  const createdEntities = await Promise.all([
    ...importDayReportsPromise,
    ...importUsersPromise,
    ...importWaysPromise,
  ]);
    
    const importEndTime = new Date();
    const fullImportTime = importEndTime.getTime() - importStartTime.getTime();
    const totalModelsImported = createdEntities.length;

    log(`

    Start read time: ${readDataStartTime}
    End read time: ${readDataEndTime}
    Total read time: ${totalReadTime}

    Start import time: ${importStartTime}
    End import time: ${importEndTime}
    Total import time: ${fullImportTime} ms


    Total Models written: ${totalModelsImported}
  `)
};