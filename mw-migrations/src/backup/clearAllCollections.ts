import { DayReportService } from "../service/DayReportService.js";
import { GoalMetricService } from "../service/GoalMetricService.js";
import { GoalService } from "../service/GoalService.js";
import { UserService } from "../service/UserService.js";
import { WayService } from "../service/WayService.js";
import { logToFile } from "../utils/logToFile.js";

const LOG_FILE = "clearAllCollections.log";
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, LOG_FILE);

export const clearAllCollections = async () => {
  const clearAllCollectionsStartTime = new Date();

  log(`Getting Users collection`)
  const allUsers = await UserService.getUsersDTO();
  log(`Got ${allUsers.length} users`)

  log(`Getting Ways collection`)
  const allWays = await WayService.getWaysDTO();
  log(`Got ${allWays.length} users`)

  log(`Getting DayReports collection`)
  const allDayReports = await DayReportService.getDayReportsDTO();
  log(`Got ${allDayReports.length} users`)

  log(`Getting Goals collection`)
  const allGoals = await GoalService.getGoalsDTO();
  log(`Got ${allGoals.length} users`)

  log(`Getting GoalMetrics collection`)
  const allGoalMetrics = await GoalMetricService.getGoalMetricsDTO();
  log(`Got ${allGoalMetrics.length} users`)

  const totalDocumentsAmount = allUsers.length + allWays.length + allDayReports.length + allGoals.length + allGoalMetrics.length;

  log(`Deleting documents in collections`)
  const deleteUsersPromise = allUsers.forEach((user) => UserService.deleteUserDTO(user.uuid))
  const deleteWaysPromise = allWays.forEach((way) => WayService.deleteWayDTO(way.uuid))
  const deleteDayReportsPromise = allDayReports.forEach((dayReport) => DayReportService.deleteDayReportDTO(dayReport.uuid))
  const deleteGoalsPromise = allGoals.forEach((goal) => GoalService.deleteGoalDTO(goal.uuid))
  const deleteGoalMetricsPromise = allGoalMetrics.forEach((goalMetrics) => GoalMetricService.deleteGoalMetricsDTO(goalMetrics.uuid))

  await Promise.all([
    deleteUsersPromise,
    deleteWaysPromise,
    deleteDayReportsPromise,
    deleteGoalsPromise,
    deleteGoalMetricsPromise,
  ])
  log(`Deleting documents in collections finished`)

  const clearAllCollectionsEndTime = new Date();
  const clearAllCollectionsTime = clearAllCollectionsEndTime.getTime() - clearAllCollectionsStartTime.getTime();

  log(`
  Start time: ${clearAllCollectionsStartTime}
  End time: ${clearAllCollectionsEndTime}
  Total time: ${clearAllCollectionsTime} ms

  Total Documents to deleted: ${totalDocumentsAmount}
`)

};
