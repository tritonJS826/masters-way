import {dayReportToDayReportDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/dayReportToDayReportDTOConverter";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {dayReportDTOToDayReportConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/dayReportDTOToDayReportConverter";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportService, NewDayReport} from "src/service/DayReportService";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Provides methods to interact with the DayReport business model
 */
export class DayReportDAL {

  /**
   * Get DayReports
   */
  public static async getDayReports(): Promise<DayReport[]> {
    const dayReportsDTO = await DayReportService.getDayReportsDTO();
    const jobsDonePreview = await JobDoneDAL.getJobsDone();
    const plansForNextPeriodPreview = await PlanForNextPeriodDAL.getPlansForNextPeriod();
    const mentorCommentsPreview = await MentorCommentDAL.getMentorComments();
    const problemsForCurrentPeriodPreview = await CurrentProblemDAL.getCurrentProblems();

    const jobsDone = dayReportsDTO.map((dayReportDTO) => {
      const jobDoneConverted = dayReportDTO.jobsDone.map((jobDoneUuid) => {
        const jobDone = jobsDonePreview
        //TODO: task #114 Use hashmap instead of .find
          .find((elem) => elem.uuid === jobDoneUuid);
        if (!jobDone) {
          throw new Error(`JobDone not found for UUID ${jobDone}`);
        }

        return jobDone;
      });

      return jobDoneConverted;
    });

    const plansForNextPeriod = dayReportsDTO.map((dayReportDTO) => {
      const planForNextPeriodConverted = dayReportDTO.plansForNextPeriod.map((planForNextPeriodUuid) => {
        const planForNextPeriod = plansForNextPeriodPreview
        //TODO: task #114
          .find((elem) => elem.uuid === planForNextPeriodUuid);
        if (!planForNextPeriod) {
          throw new Error(`PlanForNextPeriod not found for UUID ${planForNextPeriodConverted}`);
        }

        return planForNextPeriod;
      });

      return planForNextPeriodConverted;
    });

    const problemsForCurrentPeriod = dayReportsDTO.map((dayReportDTO) => {
      const problemForCurrentPeriodConverted = dayReportDTO.problemsForCurrentPeriod
        .map((problemForCurrentPeriodUuid) => {
          const problemForCurrentPeriod = problemsForCurrentPeriodPreview
          //TODO: task #114
            .find((elem) => elem.uuid === problemForCurrentPeriodUuid);
          if (!problemForCurrentPeriod) {
            throw new Error(`CurrentProblem not found for UUID ${problemForCurrentPeriodConverted}`);
          }

          return problemForCurrentPeriod;
        });

      return problemForCurrentPeriodConverted;
    });

    const mentorComments = dayReportsDTO.map((dayReportDTO) => {
      const mentorCommentConverted = dayReportDTO.mentorComments
        .map((mentorCommentUuid) => {
          const mentorComment = mentorCommentsPreview
          //TODO: task #114
            .find((elem) => elem.uuid === mentorCommentUuid);
          if (!mentorComment) {
            throw new Error(`MentorComment not found for UUID ${mentorCommentUuid}`);
          }

          return mentorComment;
        });

      return mentorCommentConverted;
    });

    /**
     * DayReportProps for each day report separately
     */
    const getDayReportProps = (i: number) => {
      const obj = {
        jobsDone: jobsDone[i],
        plansForNextPeriod: plansForNextPeriod[i],
        problemsForCurrentPeriod: problemsForCurrentPeriod[i],
        mentorComments: mentorComments[i],
      };

      return obj;
    };

    const dayReports = dayReportsDTO
      .map((dayReportPreview, i) => dayReportDTOToDayReportConverter(dayReportPreview, getDayReportProps(i)));

    return dayReports;
  }

  /**
   * Get DayReport by uuid
   */
  public static async getDayReport(uuid: string): Promise<DayReport> {
    const dayReportDTO = await DayReportService.getDayReportDTO(uuid);
    const jobsDonePreview = await JobDoneDAL.getJobsDone();
    const plansForNextPeriodPreview = await PlanForNextPeriodDAL.getPlansForNextPeriod();
    const mentorCommentsPreview = await MentorCommentDAL.getMentorComments();
    const problemsForCurrentPeriodPreview = await CurrentProblemDAL.getCurrentProblems();

    const jobsDone = dayReportDTO.jobsDone.map((jobDoneUuid) => {
      const jobDone = jobsDonePreview
      //TODO: task #114
        .find((elem) => elem.uuid === jobDoneUuid);
      if (!jobDone) {
        throw new Error(`JobDone not found for UUID ${jobDone}`);
      }

      return jobDone;
    });

    const plansForNextPeriod = dayReportDTO.plansForNextPeriod
      .map((planForNextPeriodUuid) => {
        const planForNextPeriod = plansForNextPeriodPreview
        //TODO: task #114
          .find((elem) => elem.uuid === planForNextPeriodUuid);
        if (!planForNextPeriod) {
          throw new Error(`PlanForNextPeriod not found for UUID ${planForNextPeriod}`);
        }

        return planForNextPeriod;
      });

    const problemsForCurrentPeriod = dayReportDTO.problemsForCurrentPeriod
      .map((problemForCurrentPeriodUuid) => {
        const problemForCurrentPeriod = problemsForCurrentPeriodPreview
        //TODO: task #114
          .find((elem) => elem.uuid === problemForCurrentPeriodUuid);
        if (!problemForCurrentPeriod) {
          throw new Error(`MentorComment not found for UUID ${problemForCurrentPeriod}`);
        }

        return problemForCurrentPeriod;
      });

    const mentorComments = dayReportDTO.mentorComments
      .map((mentorCommentUuid) => {
        const mentorComment = mentorCommentsPreview
        //TODO: task #114
          .find((elem) => elem.uuid === mentorCommentUuid);
        if (!mentorComment) {
          throw new Error(`MentorComment not found for UUID ${mentorComment}`);
        }

        return mentorComment;
      });

    const dayReportProps = {
      jobsDone,
      plansForNextPeriod,
      problemsForCurrentPeriod,
      mentorComments,
    };

    const dayReport = dayReportDTOToDayReportConverter(dayReportDTO, dayReportProps);

    return dayReport;
  }

  /**
   * Update DayReport
   */
  public static async updateDayReport(dayReport: DayReport) {
    const jobsDone = dayReport.jobsDone.map((item) => item.uuid);
    const plansForNextPeriod = dayReport.plansForNextPeriod.map((item) => item.uuid);
    const problemsForCurrentPeriod = dayReport.problemsForCurrentPeriod.map((item) => item.uuid);
    const mentorComments = dayReport.mentorComments.map((item) => item.uuid);

    const dayReportDTOProps = {
      jobsDone,
      plansForNextPeriod,
      problemsForCurrentPeriod,
      mentorComments,
    };

    const dayReportDTO = dayReportToDayReportDTOConverter(dayReport, dayReportDTOProps);
    await DayReportService.updateDayReportDTO(dayReportDTO, dayReport.uuid);
  }

  //TODO: task #113 Fix bug about render new Day report (after click button cells render empty)
  /**
   * Create new DayReport with empty fields and autogenerated uuid
   */
  public static async createNewDayReport() {
    const DEFAULT_DAY_REPORT: NewDayReport = {
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
  }

}