/**
 * Day's report
 */
export class DayReportPreview {

  /**
   * Day report's UUID
   */
  public uuid: string;

  /**
   * Report's date
   */
  public date: Date;

  /**
   * Jobs done uuid @JobDone.uuid
   */
  public jobDoneUuids: string[];

  /**
   * Plans for next period uuids @PlanForNextPeriod.uuid
   */
  public planForNextPeriodUuids: string[];

  /**
   * Current problems uuids @ProblemsForCurrent.uuid
   */
  public problemForCurrentPeriodUuids: string[];

  /**
   * Anything that student wants to say about work
   */
  public studentComments: string[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * Mentor's comments uuids @MentorComment.uuid
   */
  public mentorComments: string[];

  /**
   * Return true if day is off and false if it is work day
   */
  public isDayOff: boolean;

  constructor(dayReportData: DayReportPreview) {
    this.uuid = dayReportData.uuid;
    this.date = dayReportData.date;
    this.jobDoneUuids = dayReportData.jobDoneUuids;
    this.planForNextPeriodUuids = dayReportData.planForNextPeriodUuids;
    this.problemForCurrentPeriodUuids = dayReportData.problemForCurrentPeriodUuids;
    this.studentComments = dayReportData.studentComments;
    this.learnedForToday = dayReportData.learnedForToday;
    this.mentorComments = dayReportData.mentorComments;
    this.isDayOff = dayReportData.isDayOff;
  }

}