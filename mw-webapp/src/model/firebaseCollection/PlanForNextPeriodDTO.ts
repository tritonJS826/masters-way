import {TimeUnitDTO} from "src/model/firebaseCollection/time/timeUnit/TimeUnitDTO";

/**
 * Plan for next period (day, month, etc.)
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
  public timeUnit: TimeUnitDTO;

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
