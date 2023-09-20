import {StudentComment} from "src/model/firebaseCollection/StudentComment";

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
  public plansForNextPeriod: string[];

  /**
   * Array of @ProblemsForCurrent.uuid
   */
  public problemsForCurrentPeriod: string[];

  /**
   * Student comments and their status
   */
  public studentComments: StudentComment[];

  /**
   * New knowledge that the user has received
   */
  public learnedForMonth: string[];

  /**
   * Array of @MentorComment.uuid
   */
  public mentorComments: string[];

  constructor(monthReportData: MonthReport) {
    this.uuid = monthReportData.uuid;
    this.date = monthReportData.date;
    this.jobsDone = monthReportData.jobsDone;
    this.plansForNextPeriod = monthReportData.plansForNextPeriod;
    this.problemsForCurrentPeriod = monthReportData.problemsForCurrentPeriod;
    this.studentComments = monthReportData.studentComments;
    this.learnedForMonth = monthReportData.learnedForMonth;
    this.mentorComments = monthReportData.mentorComments;
  }

}
