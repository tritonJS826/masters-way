/**
 * Day's report
 */
export class DayReport {

  /**
   * Day report's UUID
   */
  public uuid: string;

  /**
   * Report's date
   */
  public date: string;

  /**
   * Array of @JobDone.uuid
   */
  public jobsDone: string[];

  /**
   * Array of @PlanForNextPeriod.uuid
   */
  public planForNextPeriod: string[];

  /**
   * Array of @ProblemsForCurrent.uuid
   */
  public problemsForCurrentPeriod: string[];

  /**
   * Anything that student wants to say about work
   */
  public studentComment: string[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * Array of @MentorComment.uuid
   */
  public mentorComment: string[];

  /**
   * Return true if day is off and false if it is work day
   */
  public isDayOff: boolean;

  constructor(dayReportData: DayReport) {
    this.uuid = dayReportData.uuid;
    this.date = dayReportData.date;
    this.jobsDone = dayReportData.jobsDone;
    this.planForNextPeriod = dayReportData.planForNextPeriod;
    this.problemsForCurrentPeriod = dayReportData.problemsForCurrentPeriod;
    this.studentComment = dayReportData.studentComment;
    this.learnedForToday = dayReportData.learnedForToday;
    this.mentorComment = dayReportData.mentorComment;
    this.isDayOff = dayReportData.isDayOff;
  }

}
