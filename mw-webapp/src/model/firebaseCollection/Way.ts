/**
 * One of user's ways
 */
export class Way {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Array of @DayReport.uuid
   */
  public dayReportUuids: string[];

  /**
   * Owner's UUID @User.uuid
   */
  public ownerUuid: string;

  /**
   * Array of @MonthReport.uuid
   */
  public monthReportUuids: string[];

  /**
   *Goal's UUID @Goal.uuid
   */
  public goalUuid: string;

  /**
   * Array of @User.uuid who are mentors of this way
   */
  public currentMentorUuids: string[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.dayReportUuids = wayData.dayReportUuids;
    this.ownerUuid = wayData.ownerUuid;
    this.monthReportUuids = wayData.monthReportUuids;
    this.goalUuid = wayData.goalUuid;
    this.currentMentorUuids = wayData.currentMentorUuids;
    this.isCompleted = wayData.isCompleted;
  }

}
