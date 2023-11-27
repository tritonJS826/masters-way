import {Comment} from "src/model/businessModel/Comment";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Month's report model
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
  public plansForNextPeriod: PlanForNextPeriod[];

  /**
   * Problems for this period
   */
  public problemsForCurrentPeriod: CurrentProblem[];

  /**
   * Mentor's and way owner's comments
   */
  public comments: Comment[];

  constructor(monthReportData: MonthReport) {
    this.uuid = monthReportData.uuid;
    this.date = monthReportData.date;
    this.jobsDone = monthReportData.jobsDone.map((jobsDoneItem) =>
      new JobDone(jobsDoneItem));
    this.plansForNextPeriod = monthReportData.plansForNextPeriod.map((planForNextPeriodItem) =>
      new PlanForNextPeriod(planForNextPeriodItem));
    this.problemsForCurrentPeriod = monthReportData.problemsForCurrentPeriod.map((currentProblemItem) =>
      new CurrentProblem(currentProblemItem));
    this.comments = monthReportData.comments;
  }

}
