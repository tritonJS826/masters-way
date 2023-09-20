import {StudentComment} from "src/model/firebaseCollection/StudentComment";

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
  public plansForNextPeriod: string[];

  /**
   * Array of @ProblemsForCurrent.uuid
   */
  public problemsForCurrentPeriod: string[];

  /**
   * Array of student comments and their status
   */
  public studentComments: StudentComment[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * Array of @MentorComment.uuid
   */
  public mentorComments: string[];

  /**
   * Return true if day is off and false if it is work day
   */
  public isDayOff: boolean;

  constructor(dayReportData: DayReport) {
    this.uuid = dayReportData.uuid;
    this.date = dayReportData.date;
    this.jobsDone = dayReportData.jobsDone;
    this.plansForNextPeriod = dayReportData.plansForNextPeriod;
    this.problemsForCurrentPeriod = dayReportData.problemsForCurrentPeriod;
    this.studentComments = dayReportData.studentComments;
    this.learnedForToday = dayReportData.learnedForToday;
    this.mentorComments = dayReportData.mentorComments;
    this.isDayOff = dayReportData.isDayOff;
  }

}
