/**
 * Day's report DTO model
 */
export class DayReportDTO {

  /**
   * Day report's UUID
   */
  public uuid: string;

  /**
   * Report's date
   */
  public date: string;

  /**
   * @JobDone.uuids
   */
  public jobDoneUuids: string[];

  /**
   * @PlanForNextPeriod.uuids
   */
  public planForNextPeriodUuids: string[];

  /**
   * @CurrentProblem.uuids
   */
  public problemForCurrentPeriodUuids: string[];

  /**
   * Student comments
   */
  public studentComments: string[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * @MentorComment.uuids
   */
  public mentorCommentUuids: string[];

  /**
   * Return true if day is off and false if it is work day
   */
  public isDayOff: boolean;

  constructor(dayReportData: DayReportDTO) {
    this.uuid = dayReportData.uuid;
    this.date = dayReportData.date;
    this.jobDoneUuids = dayReportData.jobDoneUuids;
    this.planForNextPeriodUuids = dayReportData.planForNextPeriodUuids;
    this.problemForCurrentPeriodUuids = dayReportData.problemForCurrentPeriodUuids;
    this.studentComments = dayReportData.studentComments;
    this.learnedForToday = dayReportData.learnedForToday;
    this.mentorCommentUuids = dayReportData.mentorCommentUuids;
    this.isDayOff = dayReportData.isDayOff;
  }

}
