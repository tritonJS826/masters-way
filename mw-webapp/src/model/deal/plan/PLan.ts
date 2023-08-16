import {Time} from "src/model/deal/time/Time";

/**
 * What will be done
 */
export class Plan {

  /**
   * Plan's ID
   */
  private id: string;

  /**
   * What will be done
   */
  private case: string;

  /**
   * How long will it take
   */
  private time: Time;

  constructor(planDate: Plan) {
    this.id = planDate.id;
    this.case = planDate.case;
    this.time = planDate.time;
  }

  /**
   * Get formatted plan
   */
  public getFullPlan() {
    return `${this.case} (${this.time.getFullTime})`;
  }

}