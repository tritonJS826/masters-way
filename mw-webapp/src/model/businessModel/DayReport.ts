import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {StudentComment} from "src/model/businessModel/StudentComment";

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
   * Student comments
   */
  public studentComments: StudentComment[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * Mentor's comments uuids
   * TODO: task #69 string[] -> MentorComments[]
   */
  public mentorComments: string[];

  /**
   * Return true if day is off and false if it is work day
   */
  public isDayOff: boolean;

  constructor(dayReportData: DayReport) {
    this.uuid = dayReportData.uuid;
    this.date = dayReportData.date;
    this.jobsDone = dayReportData.jobsDone?.map((jobsDoneItem) =>
      new JobDone(jobsDoneItem));
    this.plansForNextPeriod = dayReportData.plansForNextPeriod?.map((planForNextPeriodItem) =>
      new PlanForNextPeriod(planForNextPeriodItem));
    this.problemsForCurrentPeriod = dayReportData.problemsForCurrentPeriod?.map((currentProblemItem) =>
      new CurrentProblem(currentProblemItem));
    this.studentComments = dayReportData.studentComments;
    this.learnedForToday = dayReportData.learnedForToday;
    this.mentorComments = dayReportData.mentorComments;
    this.isDayOff = dayReportData.isDayOff;
  }

}