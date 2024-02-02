import { DayReportService } from "../../service/DayReportService.js";
import { UserService } from "../../service/UserService.js";
import { WayService } from "../../service/WayService.js";
import { logToFile } from "../../utils/logToFile.js";

const LOG_FILE = "clearAllCollections.log";
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, LOG_FILE);

export const clearAllCollections = async () => {
  const clearAllCollectionsStartTime = new Date();

  log(`Getting Users collection`)
  const allUsers = await UserService.getUsersDTO();
  log(`Got ${allUsers.length} users`)
  log(`Required ${allUsers.length} READ operations`)

  log(`Getting Ways collection`)
  const allWays = await WayService.getWaysDTO();
  log(`Got ${allWays.length} ways`)
  log(`Required ${allWays.length} READ operations`)

  log(`Getting DayReports collection`)
  const allDayReports = await DayReportService.getDayReportsDTO();
  log(`Got ${allDayReports.length} dayReports`)
  log(`Required ${allDayReports.length} READ operations`)

  const totalReadOperationsAmount = allUsers.length + allWays.length + allDayReports.length;

  log(`Deleting documents in collections`)
  const deleteUsersPromise = allUsers.map(user => user.uuid).map(UserService.deleteUserDTO);
  const deleteWaysPromise = allWays.map(way => way.uuid).map(WayService.deleteWayDTO);
  const deleteDayReportsPromise = allDayReports.map(report => report.uuid).map(DayReportService.deleteDayReportDTO);

  const { length: deletedAmount } = await Promise.all([
    ...deleteUsersPromise,
    ...deleteWaysPromise,
    ...deleteDayReportsPromise,
  ])
  log(`Deleting documents in collections finished`)

  const clearAllCollectionsEndTime = new Date();
  const clearAllCollectionsTime = clearAllCollectionsEndTime.getTime() - clearAllCollectionsStartTime.getTime();

  log(`
  Start time: ${clearAllCollectionsStartTime}
  End time: ${clearAllCollectionsEndTime}
  Total time: ${clearAllCollectionsTime} ms

  Total READ operations amount: ${totalReadOperationsAmount}
  Total Documents to deleted: ${deletedAmount}
`)

};
