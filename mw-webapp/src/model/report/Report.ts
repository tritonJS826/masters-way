import {WorkDone} from "src/model/report/workDone/WorkDone";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";

/**
 * Case for one row in the table
 */
export class Report {

  /**
   * Case's ID
   */
  public id: string;

  /**
   * Date, when case was done in format yyyy-mm-dd
   */
  public date: Date;

  /**
   * What was done
   */
  public workDone: WorkDone[];

  /**
   * What will be done tomorrow
   */
  public planForTomorrow: PlanForTomorrow[];

  /**
   * What the user could not do or did with difficulty (it took a very long time)
   */
  public currentProblems: string[];

  /**
   * Anything that user wants to say about work
   */
  public studentComment: string[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * Comments about work day from mentor
   */
  public mentorComment: string[];

  constructor(dealDate: Report) {
    this.id = dealDate.id;
    this.date = dealDate.date;
    this.workDone = dealDate.workDone;
    this.planForTomorrow = dealDate.planForTomorrow;
    this.currentProblems = dealDate.currentProblems;
    this.studentComment = dealDate.studentComment;
    this.learnedForToday = dealDate.learnedForToday;
    this.mentorComment = dealDate.mentorComment;
  }

}