import {Time} from "src/model/deal/time/Time";

/**
 * What will be done
 */
export class Plan {

  /**
   * Plan's ID
   */
  public id: string;

  /**
   * What will be done
   */
  public case: string;

  /**
   * How long will it take
   */
  public time: Time;

  constructor(planDate: Plan) {
    this.id = planDate.id;
    this.case = planDate.case;
    this.time = planDate.time;
  }

  /**
   * Get formatted plan
   */
  //TODO: uncomment method
  // public getFullPlan() {
  //   return `${this.case} (${this.time.getFullTime})`;
  // }

}