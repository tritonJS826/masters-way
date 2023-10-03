import {dayReportToDayReportDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/dayReportToDayReportDTOConverter";
import {dayReportDTOToDayReportConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/dayReportDTOToDayReportConverter";
import {getCurrentProblems} from "src/dataAccessLogic/getCurrentProblems";
import {getJobsDone} from "src/dataAccessLogic/getJobsDone";
import {getPlansForNextPeriod} from "src/dataAccessLogic/getPlansForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportService} from "src/service/DayReportService";

/**
 * Day reports
 * @returns {Promise<DayReport[]>}
 */
export const getDayReports = async (): Promise<DayReport[]> => {
  const dayReportsDTO = await DayReportService.getDayReportsDTO();
  const jobsDonePreview = await getJobsDone();
  const plansForNextPeriodPreview = await getPlansForNextPeriod();
  const problemsForCurrentPeriodPreview = await getCurrentProblems();

  const firstReport = dayReportsDTO[0];

  const jobsDone = firstReport.jobsDone.map((jobDoneUuid) => {
    const jobDone: JobDone = jobsDonePreview
      .find((elem) => elem.uuid === jobDoneUuid) ?? {} as JobDone;
    return jobDone;
  });

  const plansForNextPeriod = firstReport.plansForNextPeriod
    .map((planForNextPeriodUuid) => {
      const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodPreview
        .find((elem) => elem.uuid === planForNextPeriodUuid) ?? {} as PlanForNextPeriod;
      return planForNextPeriod;
    });

  const problemsForCurrentPeriod = firstReport.problemsForCurrentPeriod
    .map((problemForCurrentPeriodUuid) => {
      const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodPreview
        .find((elem) => elem.uuid === problemForCurrentPeriodUuid) ?? {} as CurrentProblem;
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

/**
 * Day report
 * @returns {Promise<DayReport>}
 */
export const getDayReport = async (uuid: string): Promise<DayReport> => {
  const dayReportDTO = await DayReportService.getDayReportDTO(uuid);
  const jobsDonePreview = await getJobsDone();
  const plansForNextPeriodPreview = await getPlansForNextPeriod();
  const problemsForCurrentPeriodPreview = await getCurrentProblems();

  const jobsDone = dayReportDTO.jobsDone.map((jobDoneUuid) => {
    const jobDone: JobDone = jobsDonePreview
      .find((elem) => elem.uuid === jobDoneUuid) ?? {} as JobDone;
    return jobDone;
  });

  const plansForNextPeriod = dayReportDTO.plansForNextPeriod
    .map((planForNextPeriodUuid) => {
      const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodPreview
        .find((elem) => elem.uuid === planForNextPeriodUuid) ?? {} as PlanForNextPeriod;
      return planForNextPeriod;
    });

  const problemsForCurrentPeriod = dayReportDTO.problemsForCurrentPeriod
    .map((problemForCurrentPeriodUuid) => {
      const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodPreview
        .find((elem) => elem.uuid === problemForCurrentPeriodUuid) ?? {} as CurrentProblem;
      return problemForCurrentPeriod;
    });

  const dayReportProps = {
    jobsDone,
    plansForNextPeriod,
    problemsForCurrentPeriod,
  };

  const dayReport = dayReportDTOToDayReportConverter(dayReportDTO, dayReportProps);

  return dayReport;
};

/**
 * Update day report
 * @param {DayReport} dayReport
 */
export const updatesDayReport = async (dayReport: DayReport) => {
  const jobsDone = dayReport.jobsDone.map((item) => item.uuid);
  const plansForNextPeriod = dayReport.plansForNextPeriod.map((item) => item.uuid);
  const problemsForCurrentPeriod = dayReport.problemsForCurrentPeriod.map((item) => item.uuid);

  const dayReportDTOProps = {
    jobsDone,
    plansForNextPeriod,
    problemsForCurrentPeriod,
  };

  const dayReportDTO = dayReportToDayReportDTOConverter(dayReport, dayReportDTOProps);
  await DayReportService.updateDayReportDTO(dayReportDTO, dayReport.uuid);
};