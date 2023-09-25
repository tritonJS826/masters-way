import {dayReportDTOToDayReportConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/dayReportDTOToDayReportConverter";
import {getCurrentProblems} from "src/dataAccessLogic/getCurrentProblems";
import {getJobsDone} from "src/dataAccessLogic/getJobsDone";
import {getPlansForNextPeriod} from "src/dataAccessLogic/getPlansForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportService} from "src/service/DayReportService";

const FIRST_INDEX = 0;

export const getDayReports = async () => {
  const dayReportsDTO = await DayReportService.getDayReports();
  const jobsDonePreview = await getJobsDone();
  const plansForNextPeriodPreview = await getPlansForNextPeriod();
  const problemsForCurrentPeriodPreview = await getCurrentProblems();

  const jobsDone = dayReportsDTO[FIRST_INDEX].jobsDone.map((jobDoneUuid) => {
    const jobDone: JobDone = jobsDonePreview
      .find((elem) => elem.uuid === jobDoneUuid) || {} as JobDone;
    return jobDone;
  });

  const plansForNextPeriod = dayReportsDTO[FIRST_INDEX].plansForNextPeriod
    .map((planForNextPeriodUuid) => {
      const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodPreview
        .find((elem) => elem.uuid === planForNextPeriodUuid) || {} as PlanForNextPeriod;
      return planForNextPeriod;
    });

  const problemsForCurrentPeriod = dayReportsDTO[FIRST_INDEX].problemsForCurrentPeriod
    .map((problemForCurrentPeriodUuid) => {
      const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodPreview
        .find((elem) => elem.uuid === problemForCurrentPeriodUuid) || {} as CurrentProblem;
      return problemForCurrentPeriod;
    });

  const dayReportProps = {
    jobsDone,
    plansForNextPeriod,
    problemsForCurrentPeriod,
  };

  const dayReports = dayReportsDTO
    .map((dayReportPreview) => dayReportDTOToDayReportConverter(dayReportPreview, dayReportProps));

  return dayReports;
};