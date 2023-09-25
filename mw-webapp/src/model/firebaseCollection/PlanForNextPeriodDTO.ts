import {TimeUnit} from "src/model/firebaseCollection/time/timeUnit/TimeUnit";

/**
 * Plan
 */
export class PlanForNextPeriodDTO {

  /**
   * Plan's UUID
   */
  public uuid: string;

  /**
   * Task that should be done in next period
   */
  public job: string;

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * Estimation time for complete job
   */
  public estimationTime: number;

  constructor(planForNextPeriodData: PlanForNextPeriodDTO) {
    this.uuid = planForNextPeriodData.uuid;
    this.job = planForNextPeriodData.job;
    this.timeUnit = planForNextPeriodData.timeUnit;
    this.estimationTime = planForNextPeriodData.estimationTime;
  }

}
