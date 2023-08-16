import {Work} from "src/model/deal/work/Work";
import {Plan} from "src/model/deal/plan/PLan";

/**
 * Case for one row in the table
 */
export class Deal {

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
  public work: Work[];

  /**
   * What will be done tomorrow
   */
  public plan: Plan[];

  /**
   * What the user could not do or did with difficulty (it took a very long time)
   */
  public problem: string[];

  /**
   * Anything that user wants to say about work
   */
  public comment: string[];

  /**
   * New knowledge that the user has received
   */
  public new: string[];

  constructor(dealDate: Deal) {
    this.id = dealDate.id;
    this.date = dealDate.date;
    this.work = dealDate.work;
    this.plan = dealDate.plan;
    this.problem = dealDate.problem;
    this.comment = dealDate.comment;
    this.new = dealDate.new;
  }

}