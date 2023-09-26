import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * Plan
 */
export class PlanForNextPeriod {

  /**
   * Plan's UUID
   */
  public uuid: string;

  /**
   * Job that should be done in next period
   */
  public job: string;

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
     * How long the job will take time
     */
  public estimationTime: number;

  constructor(planForNextPeriodData: {uuid: string; job: string; timeUnit: TimeUnit; estimationTime: number}) {
    this.uuid = planForNextPeriodData.uuid;
    this.job = planForNextPeriodData.job;
    this.timeUnit = planForNextPeriodData.timeUnit;
    this.estimationTime = planForNextPeriodData.estimationTime;
  }

  /**
   * Get formatted plan for the next period
   */
  public getPlanForNextPeriod() {
    return `${this.job} (${this.estimationTime} ${this.timeUnit})`;
  }

}
