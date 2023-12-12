import {Timestamp} from "firebase/firestore";
import {dayReportToDayReportDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/dayReportToDayReportDTOConverter";
import {dayReportDTOToDayReportConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/dayReportDTOToDayReportConverter";
import {DayReport} from "src/model/businessModel/DayReport";
import {WayDTOSchema} from "src/model/DTOModel/WayDTO";
import {DayReportDTOWithoutUuid, DayReportService} from "src/service/DayReportService";
import {WayService} from "src/service/WayService";

/**
 * Provides methods to interact with the DayReport business model
 */
export class DayReportDAL {

  /**
   * Get DayReports that belong to a specific way
   */
  public static async getDayReports(wayUuid: string): Promise<DayReport[]> {

    const dayReportsUuids = (await WayService.getWayDTO(wayUuid)).dayReportUuids;

    const dayReportsDTO = await DayReportService.getDayReportsDTO(dayReportsUuids);

    const dayReports = await Promise.all(dayReportsDTO.map(async (dayReportDTO) => {
      const dayReport = dayReportDTOToDayReportConverter(dayReportDTO);

      return dayReport;
    }));

    return dayReports;
  }

  /**
   * Get DayReport by uuid
   */
  public static async getDayReport(uuid: string): Promise<DayReport> {
    const dayReportDTO = await DayReportService.getDayReportDTO(uuid);
    const dayReport = dayReportDTOToDayReportConverter(dayReportDTO);

    return dayReport;
  }

  /**
   * Create DayReport with empty fields and autogenerated uuid
   */
  public static async createDayReport(wayUuid: string): Promise<DayReport> {
    const DEFAULT_DAY_REPORT: DayReportDTOWithoutUuid = {
      date: Timestamp.fromDate(new Date()),
      jobDoneUuids: [],
      planForNextPeriodUuids: [],
      problemForCurrentPeriodUuids: [],
      commentUuids: [],
      isDayOff: false,
    };
    const dayReportDTO = await DayReportService.createDayReportDTO(DEFAULT_DAY_REPORT);

    const way = await WayService.getWayDTO(wayUuid);

    const updatedDayReportUuids = [...way.dayReportUuids, dayReportDTO.uuid];

    const updatedWay = WayDTOSchema.parse({
      uuid: way.uuid,
      name: way.name,
      dayReportUuids: updatedDayReportUuids,
      ownerUuid: way.ownerUuid,
      goalUuid: way.goalUuid,
      mentorUuids: way.mentorUuids,
      mentorRequestUuids: way.mentorRequestUuids,
      isCompleted: way.isCompleted,
      lastUpdate: Timestamp.fromDate(new Date()),
      createdAt: way.createdAt,
      favoriteForUserUuids: way.favoriteForUserUuids,
      wayTags: way.wayTags,
      jobTags: way.jobTags,
    });

    await WayService.updateWayDTO(updatedWay, way.uuid);

    const dayReport = await DayReportDAL.getDayReport(dayReportDTO.uuid);

    return dayReport;
  }

  /**
   * Update DayReport
   */
  public static async updateDayReport(dayReport: DayReport) {
    const dayReportDTO = dayReportToDayReportDTOConverter(dayReport);
    await DayReportService.updateDayReportDTO(dayReportDTO, dayReport.uuid);
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
