import {Comment} from "src/model/businessModel/Comment";
import {JobDone} from "src/model/businessModel/JobDone";
import {Plan} from "src/model/businessModel/Plan";
import {Problem} from "src/model/businessModel/Problem";

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
  public createdAt: Date;

  /**
   * Job done per day
   */
  public jobsDone: JobDone[];

  /**
   * Plans for next period (for tomorrow)
   */
  public plans: Plan[];

  /**
   * Problems for this period (today)
   */
  public problems: Problem[];

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
    this.createdAt = dayReportData.createdAt;
    this.jobsDone = dayReportData.jobsDone;
    this.plans = dayReportData.plans;
    this.problems = dayReportData.problems;
    this.comments = dayReportData.comments;
    this.isDayOff = dayReportData.isDayOff;
  }

}
