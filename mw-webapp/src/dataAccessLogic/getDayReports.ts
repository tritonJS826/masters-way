import {DayReportPreviewToDayReportConverter} from "src/convertBusinessPreviewToBusiness/dayReportConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {CurrentProblemService} from "src/service/CurrentProblemService";
import {DayReportService} from "src/service/DayReportService";
import {JobDoneService} from "src/service/JobDoneService";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

const FIRST_INDEX = 0;

export const getDayReports = async () => {
  const dayReportsPreview = await DayReportService.getDayReportsPreview();
  const jobsDonePreview = await JobDoneService.getJobsDone();
  const plansForNextPeriodPreview = await PlanForNextPeriodService.getPlansForNextPeriod();
  const problemsForCurrentPeriodPreview = await CurrentProblemService.getCurrentProblems();

  const jobsDone = dayReportsPreview[FIRST_INDEX].jobDoneUuids.map((jobDoneUuid) => {
    const jobDone: JobDone = jobsDonePreview
      .find((elem) => elem.uuid === jobDoneUuid) || jobsDonePreview[FIRST_INDEX];
    return jobDone;
  });

  const plansForNextPeriod = dayReportsPreview[FIRST_INDEX].planForNextPeriodUuids
    .map((planForNextPeriodUuids) => {
      const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodPreview
        .find((elem) => elem.uuid === planForNextPeriodUuids) || plansForNextPeriodPreview[FIRST_INDEX];
      return planForNextPeriod;
    });

  const problemsForCurrentPeriod = dayReportsPreview[FIRST_INDEX].problemForCurrentPeriodUuids
    .map((problemForCurrentPeriodUuid) => {
      const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodPreview
        .find((elem) => elem.uuid === problemForCurrentPeriodUuid) || problemsForCurrentPeriodPreview[FIRST_INDEX];
      return problemForCurrentPeriod;
    });

  const dayReportPreviewProps = {
    jobsDone,
    plansForNextPeriod,
    problemsForCurrentPeriod,
  };

  const dayReports = dayReportsPreview
    .map((dayReportPreview) => DayReportPreviewToDayReportConverter(dayReportPreview, dayReportPreviewProps));

  return dayReports;
};