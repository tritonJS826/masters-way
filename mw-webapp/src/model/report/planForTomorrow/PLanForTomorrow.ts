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

  constructor(planDate: PlanForTomorrow) {
    this.id = planDate.id;
    this.todoItem = planDate.todoItem;
    this.time = planDate.time;
  }

  /**
   * Get formatted plan
   */
  //TODO: uncomment method
  public getFullPlan() {
    return `${this.todoItem} (${this.time.getFullTime()})`;
  }

}