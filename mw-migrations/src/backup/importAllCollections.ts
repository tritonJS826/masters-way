import { DayReportService } from "../service/DayReportService.js";
import { GoalMetricService } from "../service/GoalMetricService.js";
import { GoalService } from "../service/GoalService.js";
import { UserService } from "../service/UserService.js";
import { WayService } from "../service/WayService.js";
import { logToFile } from "../utils/logToFile.js";
import { clearAllCollections } from "./clearAllCollections.js";

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
const importToFirebase = async () => {
  const importStartTime = new Date();
  
  clearAllCollections();
  
  const dayReports = JSON.parse(DAY_REPORTS_BACKUP_FILE);
  const goals = JSON.parse(GOALS_BACKUP_FILE);
  const goalMetrics = JSON.parse(GOAL_METRICS_BACKUP_FILE);
  const users = JSON.parse(USERS_BACKUP_FILE);
  const ways = JSON.parse(WAYS_BACKUP_FILE);

  const dayReportsAmountPromise = dayReports.map(DayReportService.createDayReportDTO).length;
  const goalsAmountPromise = goals.map(GoalService.createGoalDTO).length;
  const usersAmountPromise = users.map(UserService.createUserDTO).length;
  const waysAmountPromise = ways.map(WayService.createWayDTO).length;
  const goalMetricsAmountPromise = goalMetrics.map(GoalMetricService.createGoalMetricsDTO).length;

    const [dayReportsAmount, goalsAmount, usersAmount, waysAmount, goalMetricsAmount] = await Promise.all([
      dayReportsAmountPromise,
      goalsAmountPromise,
      usersAmountPromise,
      waysAmountPromise,
      goalMetricsAmountPromise,
    ]);
    
    const importEndTime = new Date();
    const fullImportTime = importEndTime.getTime() - importStartTime.getTime();
    const totalModelsImport = dayReportsAmount + goalsAmount + usersAmount + waysAmount + goalMetricsAmount;

    log(`
    Start time: ${importStartTime}
    End time: ${importEndTime}
    Total time: ${fullImportTime} ms

    Total Models written: ${totalModelsImport}
  `)
};

importToFirebase();