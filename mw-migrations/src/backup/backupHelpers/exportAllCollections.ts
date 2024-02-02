import { logToFile } from "../../utils/logToFile.js";
import { writeBackup } from "../../utils/writeBackup.js";
import { exportDayReports } from "./dayReports.js";
import { exportUsers } from "./users.js";
import { exportWays } from "./ways.js";

export const LOG_FILE = "firebase.log";
export const DAY_REPORTS_BACKUP_FILE = "dayReports.bkp";
export const GOALS_BACKUP_FILE = "goals.bkp";
export const USERS_BACKUP_FILE = "users.bkp";
export const WAYS_BACKUP_FILE = "ways.bkp";
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, LOG_FILE);


/**
 * DON'T RUN THIS SCRIPT!!! IT COULD KILL OUR FIREBASE
 * 
 * Also there is a limit for http request size - 10 Mb, so it will work only for now
 * should be fixed before productions
 */
export const exportFirebase = async () => {
    const backupStartTime = new Date();

    const dayReportsAmountPromise = exportDayReports({log, backupToFile: (data: string) => writeBackup(data, DAY_REPORTS_BACKUP_FILE) });
    const usersAmountPromise = exportUsers({log, backupToFile: (data: string) => writeBackup(data, USERS_BACKUP_FILE) });
    const waysAmountPromise = exportWays({log, backupToFile: (data: string) => writeBackup(data, WAYS_BACKUP_FILE) });
    
    const [dayReportsAmount, usersAmount, waysAmount] = await Promise.all([
      dayReportsAmountPromise,
      usersAmountPromise,
      waysAmountPromise,
    ]);
    
    const backupEndTime = new Date();
    const fullBackupTime = backupEndTime.getTime() - backupStartTime.getTime();
    const totalModelsBackup = dayReportsAmount + usersAmount + waysAmount;

    log(`
    Start time: ${backupStartTime}
    End time: ${backupEndTime}
    Total time: ${fullBackupTime} ms

    Total Models exported: ${totalModelsBackup}
  `)
};