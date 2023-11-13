import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";

/**
 * Add PlanForNextPeriod
 */
export const addPlanForNextPeriod = async (dayReportUuid: string) => {
  const newPlanForNextPeriod = await PlanForNextPeriodDAL.createPlanForNextPeriod();
  const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
  const updatedPlansForNextPeriod = [...updatedDayReport.plansForNextPeriod, newPlanForNextPeriod];
  const dayReportUpdated = {...updatedDayReport, plansForNextPeriod: updatedPlansForNextPeriod};
  await DayReportDAL.updateDayReport(dayReportUpdated);
};