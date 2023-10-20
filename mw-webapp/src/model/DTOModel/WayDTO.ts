/**
 * Way DTO model
 */
export class WayDTO {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * @DayReport.uuids
   */
  public dayReportUuids: string[];

  /**
   * Owner's UUIDs @User.uuid
   */
  public ownerUuid: string;

  /**
   * @MonthReport.uuids
   */
  public monthReportUuids: string[];

  /**
   *Goal's UUID @Goal.uuid
   */
  public goalUuid: string;

  /**
   * Mentor's UUIDs @User.uuid
   */
  public currentMentorUuids: string[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: WayDTO) {
    this.uuid = wayData.uuid;
    this.dayReportUuids = wayData.dayReportUuids;
    this.ownerUuid = wayData.ownerUuid;
    this.monthReportUuids = wayData.monthReportUuids;
    this.goalUuid = wayData.goalUuid;
    this.currentMentorUuids = wayData.currentMentorUuids;
    this.isCompleted = wayData.isCompleted;
  }

}
