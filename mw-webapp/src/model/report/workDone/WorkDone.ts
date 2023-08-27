import {Time} from "src/model/report/time/Time";
import {Unit} from "src/model/report/time/unit/Unit";

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
  public time: Time;

  constructor(id: string, todoItem: string, time: { unit: Unit, amount: number }) {
    this.id = id;
    this.todoItem = todoItem;
    this.time = new Time(time.unit, time.amount);
  }

  /**
   * Get formatted work
   */
  public getFullWork() {
    return `${this.todoItem} (${this.time.amount} ${this.time.unit})`;
  }

}
