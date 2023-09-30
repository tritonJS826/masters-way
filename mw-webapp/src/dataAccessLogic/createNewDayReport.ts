import {DayReportService, NewDayReportProps} from "src/service/DayReportService";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Create new day report with empty fields and autogenerated uuid
 */
export const createNewDayReport = async () => {
  const DEFAULT_DAY_REPORT: NewDayReportProps = {
    date: DateUtils.getShortISODateValue(new Date),
    jobsDone: [],
    plansForNextPeriod: [],
    problemsForCurrentPeriod: [],
    studentComments: [],
    learnedForToday: [],
    mentorComments: [],
    isDayOff: false,
  };
  await DayReportService.createDayReportDTO(DEFAULT_DAY_REPORT);
};