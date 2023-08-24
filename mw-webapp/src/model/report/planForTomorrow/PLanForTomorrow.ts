import {Time} from "src/model/report/time/Time";

/**
 * What will be done
 */
export class PlanForTomorrow {

  /**
   * Plan's ID
   */
  public id: string;

  /**
   * What will be done
   */
  public todoItem: string;

  /**
   * How long will it take
   */
  public time: Time;

  constructor(id: string, todoItem: string, time: { unit: string, amount: number }) {
    this.id = id;
    this.todoItem = todoItem;
    this.time = new Time(time.unit, time.amount);
  }

  /**
   * Get formatted plan
   */
  //TODO: uncomment method
  public getFullPlan() {
    return `${this.todoItem} (${this.time.amount} ${this.time.unit})`;
  }

}