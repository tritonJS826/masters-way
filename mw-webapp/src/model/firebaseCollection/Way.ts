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
  public dayReportUuid: string[];

  /**
   * Owner's UUID @User.uuid
   */
  public ownerUuid: string;

  /**
   * Array of @MonthReport.uuid
   */
  public monthReportUuid: string[];

  /**
   *Goal's UUID @Goal.uuid
   */
  public goalUuid: string;

  /**
   * Array of @User.uuid who are mentors of this way
   */
  public currentMentors: string[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.dayReportUuid = wayData.dayReportUuid;
    this.ownerUuid = wayData.ownerUuid;
    this.monthReportUuid = wayData.monthReportUuid;
    this.goalUuid = wayData.goalUuid;
    this.currentMentors = wayData.currentMentors;
    this.isCompleted = wayData.isCompleted;
  }

}
