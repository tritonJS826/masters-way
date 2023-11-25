import {dayReportToDayReportDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/dayReportToDayReportDTOConverter";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {dayReportDTOToDayReportConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/dayReportDTOToDayReportConverter";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {WayDTOSchema} from "src/model/DTOModel/WayDTO";
import {DayReportDTOWithoutUuid, DayReportService} from "src/service/DayReportService";
import {WayService} from "src/service/WayService";
import {DateUtils} from "src/utils/DateUtils";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * Provides methods to interact with the DayReport business model
 */
export class DayReportDAL {

  /**
   * Get DayReports that belong to a specific way
   */
  public static async getDayReports(wayUuid: string): Promise<DayReport[]> {
    const dayReportsUuids = (await WayService.getWayDTO(wayUuid)).dayReportUuids;

    const dayReports = await Promise.all(dayReportsUuids.map(DayReportDAL.getDayReport));

    const dayReportSortedByDate = dayReports.sort((a, b) => b.date.getTime() - a.date.getTime());

    return dayReportSortedByDate;
  }

  /**
   * Get DayReport by uuid
   */
  public static async getDayReport(uuid: string): Promise<DayReport> {
    const dayReportDTO = await DayReportService.getDayReportDTO(uuid);
    const {jobDoneUuids, planForNextPeriodUuids, mentorCommentUuids, problemForCurrentPeriodUuids} = dayReportDTO;

    const jobsDone = await Promise.all(jobDoneUuids.map(JobDoneDAL.getJobDone));

    const plansForNextPeriod = await Promise.all(planForNextPeriodUuids.map(PlanForNextPeriodDAL.getPlanForNextPeriod));

    const mentorComments = await Promise.all(mentorCommentUuids.map(MentorCommentDAL.getMentorComment));

    const problemsForCurrentPeriod = await Promise.all(problemForCurrentPeriodUuids.map(CurrentProblemDAL.getCurrentProblem));

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
   * Create DayReport with empty fields and autogenerated uuid
   */
  public static async createDayReport(wayUuid: string): Promise<DayReport> {
    const DEFAULT_DAY_REPORT: DayReportDTOWithoutUuid = {
      date: DateUtils.getShortISODateValue(new Date),
      jobDoneUuids: [],
      planForNextPeriodUuids: [],
      problemForCurrentPeriodUuids: [],
      studentComments: [],
      mentorCommentUuids: [],
      isDayOff: false,
    };
    const dayReportDTO = await DayReportService.createDayReportDTO(DEFAULT_DAY_REPORT);

    const way = await WayService.getWayDTO(wayUuid);

    const updatedDayReportUuids = [...way.dayReportUuids, dayReportDTO.uuid];

    const updatedWay = WayDTOSchema.parse({
      uuid: way.uuid,
      name: way.name,
      dayReportUuids: updatedDayReportUuids,
      monthReportUuids: way.monthReportUuids,
      ownerUuid: way.ownerUuid,
      goalUuid: way.goalUuid,
      currentMentorUuids: way.currentMentorUuids,
      isCompleted: way.isCompleted,
    });

    await WayService.updateWayDTO(updatedWay, way.uuid);

    const dayReport = await DayReportDAL.getDayReport(dayReportDTO.uuid);

    return dayReport;
  }

  /**
   * Update DayReport
   */
  public static async updateDayReport(dayReport: DayReport) {
    const jobDoneUuids = dayReport.jobsDone.map((item) => item.uuid);
    const planForNextPeriodUuids = dayReport.plansForNextPeriod.map((item) => item.uuid);
    const problemForCurrentPeriodUuids = dayReport.problemsForCurrentPeriod.map((item) => item.uuid);
    const mentorCommentUuids = dayReport.mentorComments.map((item) => item.uuid);

    const dayReportDTOProps = {
      jobDoneUuids,
      planForNextPeriodUuids,
      problemForCurrentPeriodUuids,
      mentorCommentUuids,
    };

    const dayReportDTO = dayReportToDayReportDTOConverter(dayReport, dayReportDTOProps);
    await DayReportService.updateDayReportDTO(dayReportDTO, dayReport.uuid);
  }

  /**
   * Create student comment to DayReport
   */
  public static async createStudentComment(dayReport: DayReport) {
    const updatedCell = [...dayReport.studentComments, UnicodeSymbols.ZERO_WIDTH_SPACE];

    const updatedDayReport: DayReport = {
      ...dayReport,
      studentComments: updatedCell,
    };
    await DayReportDAL.updateDayReport(updatedDayReport);

    return updatedDayReport;
  }

  /**
   * Update student comment to DayReport
   */
  public static async updateStudentComment(dayReport: DayReport, text: string, index: number) {
    const getUpdatedText = dayReport.studentComments.map((item: string, i: number) => {
      if (i === index) {
        return `${text}`;
      }

      return item;
    });

    const updatedDayReport: DayReport = {
      ...dayReport,
      studentComments: getUpdatedText,
    };
    await DayReportDAL.updateDayReport(updatedDayReport);
  }

  /**
   * Update isDayOff to DayReport
   */
  public static async updateIsDayOff(dayReport: DayReport, isDayOff: boolean) {
    const updatedDayReport: DayReport = {
      ...dayReport,
      isDayOff,
    };

    await DayReportDAL.updateDayReport(updatedDayReport);
  }

}
