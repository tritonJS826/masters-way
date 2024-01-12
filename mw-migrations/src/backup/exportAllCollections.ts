import { logToFile } from "../utils/logToFile.js";
import { writeBackup } from "../utils/writeBackup.js";
import { exportDayReports } from "./dayReports.js";
import { exportGoalMetrics } from "./goalMetrics.js";
import { exportGoals } from "./goals.js";
import { exportUsers } from "./users.js";
import { exportWays } from "./ways.js";

const LOG_FILE = "firebase.log";
const DAY_REPORTS_BACKUP_FILE = "dayReports.bkp";
const GOALS_BACKUP_FILE = "goals.bkp";
const GOAL_METRICS_BACKUP_FILE = "goalMetrics.bkp";
const USERS_BACKUP_FILE = "users.bkp";
const WAYS_BACKUP_FILE = "ways.bkp";
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, LOG_FILE);


/**
 * DON'T RUN THIS SCRIPT!!! IT COULD KILL OUR FIREBASE
 * 
 * Also there is a limit for http request size - 10 Mb, so it will work only for now
 * should be fixed before productions
 */
const exportFirebase = async () => {
    const backupStartTime = new Date();

    const dayReportsAmountPromise = exportDayReports({log, backupToFile: (data: string) => writeBackup(data, DAY_REPORTS_BACKUP_FILE) });
    const goalsAmountPromise = exportGoals({log, backupToFile: (data: string) => writeBackup(data, GOALS_BACKUP_FILE) });
    const usersAmountPromise = exportUsers({log, backupToFile: (data: string) => writeBackup(data, USERS_BACKUP_FILE) });
    const waysAmountPromise = exportWays({log, backupToFile: (data: string) => writeBackup(data, WAYS_BACKUP_FILE) });
    const goalMetricsAmountPromise = exportGoalMetrics({ log, backupToFile: (data: string) => writeBackup(data, GOAL_METRICS_BACKUP_FILE) });
    
    const [dayReportsAmount, goalsAmount, usersAmount, waysAmount, goalMetricsAmount] = await Promise.all([
      dayReportsAmountPromise,
      goalsAmountPromise,
      usersAmountPromise,
      waysAmountPromise,
      goalMetricsAmountPromise,
    ]);
    
    const backupEndTime = new Date();
    const fullBackupTime = backupEndTime.getTime() - backupStartTime.getTime();
    const totalModelsBackup = dayReportsAmount + goalsAmount + usersAmount + waysAmount + goalMetricsAmount;

    log(`
    Start time: ${backupStartTime}
    End time: ${backupEndTime}
    Total time: ${fullBackupTime} ms

    Total Models to changed: ${totalModelsBackup}
  `)
};

exportFirebase();