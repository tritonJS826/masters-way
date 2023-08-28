import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

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
  public date: Date;

  /**
   * Job done per month
   */
  public jobsDone: JobDone[];

  /**
   * Plans for next period
   */
  public planForNextPeriod: PlanForNextPeriod[];

  /**
   * Problems for this period
   */
  public problemsForCurrentPeriod: CurrentProblem[];

  /**
   * Anything that student wants to say about work
   */
  public studentComment: string[];

  /**
   * New knowledge that the user has received
   */
  public learnedForMonth: string[];

  /**
   * Mentor's comments
   */
  public mentorComment: string[];

  constructor(monthReportData: MonthReport) {
    this.uuid = monthReportData.uuid;
    this.date = monthReportData.date;
    this.jobsDone = monthReportData.jobsDone?.map((jobsDoneItem) =>
      new JobDone(jobsDoneItem));
    this.planForNextPeriod = monthReportData.planForNextPeriod?.map((planForNextPeriodItem) =>
      new PlanForNextPeriod(planForNextPeriodItem));
    this.problemsForCurrentPeriod = monthReportData.problemsForCurrentPeriod?.map((currentProblemItem) =>
      new CurrentProblem(currentProblemItem));
    this.studentComment = monthReportData.studentComment;
    this.learnedForMonth = monthReportData.learnedForMonth;
    this.mentorComment = monthReportData.mentorComment;
  }

}
