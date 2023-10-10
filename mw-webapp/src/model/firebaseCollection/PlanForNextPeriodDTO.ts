import {TimeUnit} from "src/model/firebaseCollection/time/timeUnit/TimeUnit";

/**
 * Plan for next period DTO model
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
   * Unit of time measurement for {@link estimationTime}
   */
  public timeUnit: TimeUnit;

  /**
   * Estimation number of time units {@link timeUnit}
   */
  public estimationTime: number;

  constructor(planForNextPeriodData: PlanForNextPeriodDTO) {
    this.uuid = planForNextPeriodData.uuid;
    this.job = planForNextPeriodData.job;
    this.timeUnit = planForNextPeriodData.timeUnit;
    this.estimationTime = planForNextPeriodData.estimationTime;
  }

}
