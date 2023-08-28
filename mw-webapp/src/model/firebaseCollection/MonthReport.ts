/**
 * Month's report
 */
export class MonthReport {

  /**
   * Month report's UUID
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
  public learnedForMonth: string[];

  /**
   * Array of @MentorComment.uuid
   */
  public mentorComment: string[];

  constructor(monthReportData: MonthReport) {
    this.uuid = monthReportData.uuid;
    this.date = monthReportData.date;
    this.jobsDone = monthReportData.jobsDone;
    this.planForNextPeriod = monthReportData.planForNextPeriod;
    this.problemsForCurrentPeriod = monthReportData.problemsForCurrentPeriod;
    this.studentComment = monthReportData.studentComment;
    this.learnedForMonth = monthReportData.learnedForMonth;
    this.mentorComment = monthReportData.mentorComment;
  }

}
