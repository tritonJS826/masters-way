import {makeAutoObservable} from "mobx";
import {Comment} from "src/model/businessModel/Comment";
import {JobDone} from "src/model/businessModel/JobDone";
import {Plan} from "src/model/businessModel/Plan";
import {Problem} from "src/model/businessModel/Problem";

/**
 * DayReport props
 */
interface DayReportProps {

    /**
     * Day report's UUID
     */
    uuid: string;

    /**
     * Report's created date
     */
    createdAt: Date;

    /**
     * Report's updated date
     */
    updatedAt: Date;

    /**
     * Job done per day
     */
    jobsDone: JobDone[];

    /**
     * Plans for next period (for tomorrow)
     */
    plans: Plan[];

    /**
     * Problems for this period (today)
     */
    problems: Problem[];

    /**
     * Mentor's and way owner's comments uuids
     */
    comments: Comment[];

    /**
     * Return true if day is off and false if it is work day
     */
    isDayOff: boolean;
}

/**
 * Day's report model
 */
export class DayReport {

  /**
   * Day report's UUID
   */
  public uuid: string;

  /**
   * Report's created date
   */
  public createdAt: Date;

  /**
   * Report's updated date
   */
  public updatedAt: Date;

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

  constructor(dayReportData: DayReportProps) {
    makeAutoObservable(this);
    this.uuid = dayReportData.uuid;
    this.createdAt = dayReportData.createdAt;
    this.updatedAt = dayReportData.updatedAt;
    this.jobsDone = dayReportData.jobsDone.map(job => new JobDone(job));
    this.plans = dayReportData.plans.map(plan => new Plan(plan));
    this.problems = dayReportData.problems.map(problem => new Problem(problem));
    this.comments = dayReportData.comments.map(comment => new Comment(comment));
    this.isDayOff = dayReportData.isDayOff;
  }

  /**
   * Add job
   */
  public addJob(job: JobDone): void {
    this.jobsDone.push(job);
  }

  /**
   * Delete job
   */
  public deleteJob(jobUuid: string): void {
    this.jobsDone = this.jobsDone.filter(job => job.uuid !== jobUuid);
  }

  /**
   * Add plan
   */
  public addPlan(plan: Plan): void {
    this.plans.push(plan);
  }

  /**
   * Delete plan
   */
  public deletePlan(planUuid: string): void {
    this.plans = this.plans.filter(plan => plan.uuid !== planUuid);
  }

  /**
   * Add problem
   */
  public addProblem(problem: Problem): void {
    this.problems.push(problem);
  }

  /**
   * Delete problem
   */
  public deleteProblem(problemUuid: string): void {
    this.problems = this.problems.filter(problem => problem.uuid !== problemUuid);
  }

  /**
   * Add comment
   */
  public addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  /**
   * Delete comment
   */
  public deleteComment(commentUuid: string): void {
    this.comments = this.comments.filter(comment => comment.uuid !== commentUuid);
  }

}
