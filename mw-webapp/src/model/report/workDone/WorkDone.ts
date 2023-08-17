import {Time} from "src/model/report/time/Time";

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
   * How long was the job done
   */
  public time: Time;

  constructor(workDate: WorkDone) {
    this.id = workDate.id;
    this.todoItem = workDate.todoItem;
    this.time = workDate.time;
  }

  /**
   * Get formatted work
   */
  public getFullWork() {
    return `${this.todoItem} (${this.time.getFullTime})`;
  }

}