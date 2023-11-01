import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";

/**
 * Add JobDone
 */
export const addJobDone = async (dayReportUuid: string) => {
  const newJobDone = await JobDoneDAL.createJobDone();
  const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
  const updatedJobsDone = [...updatedDayReport.jobsDone, newJobDone];
  const dayReportUpdated = {...updatedDayReport, jobsDone: updatedJobsDone};
  await DayReportDAL.updateDayReport(dayReportUpdated);
};