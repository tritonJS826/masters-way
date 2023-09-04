import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

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
   * Enum @Time.unit (minute, hour, day, etc.)
   */
  public timeUnit: TimeUnit;

  /**
     * How long the task will take time
     */
  public time: number;


  constructor(planForNextPeriodData: PlanForNextPeriod) {
    this.uuid = planForNextPeriodData.uuid;
    this.job = planForNextPeriodData.job;
    this.timeUnit = planForNextPeriodData.timeUnit;
    this.time = planForNextPeriodData.time;
  }

  /**
   * Get formatted plan for the next period
   */
  public getPlanForNextPeriod() {
    return `${this.job} (${this.time} ${this.timeUnit})`;
  }

}
