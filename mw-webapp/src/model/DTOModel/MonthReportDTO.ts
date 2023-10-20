/**
 * Month's report DTO model
 */
export class MonthReportDTO {

  /**
   * Month report's UUID
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
  public learnedForMonth: string[];

  /**
   * @MentorComment.uuids
   */
  public mentorCommentUuids: string[];

  constructor(monthReportData: MonthReportDTO) {
    this.uuid = monthReportData.uuid;
    this.date = monthReportData.date;
    this.jobDoneUuids = monthReportData.jobDoneUuids;
    this.planForNextPeriodUuids = monthReportData.planForNextPeriodUuids;
    this.problemForCurrentPeriodUuids = monthReportData.problemForCurrentPeriodUuids;
    this.studentComments = monthReportData.studentComments;
    this.learnedForMonth = monthReportData.learnedForMonth;
    this.mentorCommentUuids = monthReportData.mentorCommentUuids;
  }

}
