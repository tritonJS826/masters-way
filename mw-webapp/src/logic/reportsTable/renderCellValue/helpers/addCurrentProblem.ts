import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";

/**
 * Add CurrentProblem
 */
export const addCurrentProblem = async (dayReportUuid: string) => {
  const newCurrentProblem = await CurrentProblemDAL.createCurrentProblem();
  const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
  const updatedCurrentProblem = [...updatedDayReport.problemsForCurrentPeriod, newCurrentProblem];
  const dayReportUpdated = {...updatedDayReport, problemsForCurrentPeriod: updatedCurrentProblem};
  await DayReportDAL.updateDayReport(dayReportUpdated);
};