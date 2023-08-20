// import {Time} from "src/model/report/time/Time";
import {Unit} from "../time/unit/Unit";

/**
 * What was done
 */
export class WorkDone {

  /**
   * Work's ID
   */
  public id: string;

  /**
   * What was done
   */
  public todoItem: string;

  /**
   * How long was the job done in minutes
   */
  public time: number;

  constructor(id: string, todoItem: string, time: number) {
    this.id = id;
    this.todoItem = todoItem;
    this.time = time;
  }

  /**
   * Get formatted work
   */
  public getFullWork() {
    return `${this.todoItem} (${this.time} ${Unit.MINUTE})`;
  }

}