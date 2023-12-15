import {Comment} from "src/model/businessModel/Comment";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Day's report model
 */
export class DayReport {

  /**
   * Day report's UUID
   */
  public uuid: string;

  /**
   * Report's date
   */
  public date: Date;

  /**
   * Job done per day
   */
  public jobsDone: JobDone[];

  /**
   * Plans for next period (for tomorrow)
   */
  public plansForNextPeriod: PlanForNextPeriod[];

  /**
   * Problems for this period (today)
   */
  public problemsForCurrentPeriod: CurrentProblem[];

  /**
   * Mentor's and way owner's comments uuids
   */
  public comments: Comment[];

  /**
   * Return true if day is off and false if it is work day
   */
  public isDayOff: boolean;

  constructor(dayReportData: DayReport) {
    this.uuid = dayReportData.uuid;
    this.date = dayReportData.date;
    this.jobsDone = dayReportData.jobsDone.map((jobsDoneItem) =>
      new JobDone(jobsDoneItem));
    this.plansForNextPeriod = dayReportData.plansForNextPeriod.map((planForNextPeriodItem) =>
      new PlanForNextPeriod(planForNextPeriodItem));
    this.problemsForCurrentPeriod = dayReportData.problemsForCurrentPeriod.map((currentProblemItem) =>
      new CurrentProblem(currentProblemItem));
    this.comments = dayReportData.comments.map((comment) =>
      new Comment(comment));
    this.isDayOff = dayReportData.isDayOff;
  }

}
