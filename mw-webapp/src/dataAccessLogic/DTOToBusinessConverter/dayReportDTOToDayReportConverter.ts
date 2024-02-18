import {DayReport} from "src/model/businessModel/DayReport";
import {DAY_REPORT_UPDATED_AT_FIELD, DayReportDTO} from "src/model/DTOModel/DayReportDTO";

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const dayReportDTOToDayReportConverter = (dayReportDTO: DayReportDTO): DayReport => {

  return new DayReport({
    ...dayReportDTO,
    createdAt: dayReportDTO.createdAt.toDate(),
    jobsDone: dayReportDTO.jobsDoneStringified.map((jobDoneStringified) => JSON.parse(jobDoneStringified)),
    plans: dayReportDTO.plansStringified.map((planStringified) => JSON.parse(planStringified)),
    problems: dayReportDTO.problemsStringified.map((problemStringified) => JSON.parse(problemStringified)),
    comments: dayReportDTO.commentsStringified.map((commentStringified) => JSON.parse(commentStringified)),
    updatedAt: dayReportDTO[DAY_REPORT_UPDATED_AT_FIELD].toDate(),
  });
};

