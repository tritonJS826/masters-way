import {Time} from "src/model/businessModel/time/Time";

/**
 * Plan for next period (day, month, etc.)
 */
export class PlanForNextPeriod {

  /**
   * Plan's UUID
   */
  public uuid: string;

  /**
   * Task that should be done in next period
   */
  public job: string;

  /**
   * How long was the job done
   */
  public time: Time;


  constructor(planForNextPeriodData: PlanForNextPeriod) {
    this.uuid = planForNextPeriodData.uuid;
    this.job = planForNextPeriodData.job;
    this.time = new Time(planForNextPeriodData.time.unit, planForNextPeriodData.time.amount);
  }

  /**
   * Get formatted plan for the next period
   */
  public getFullPlanForNextPeriod() {
    return `${this.job} (${this.time.amount} ${this.time.unit})`;
  }

}
