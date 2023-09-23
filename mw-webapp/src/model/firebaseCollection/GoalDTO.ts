import {TimeUnitDTO} from "src/model/firebaseCollection/time/timeUnit/TimeUnitDTO";

/**
 * Goal of the way
 */
export class GoalDTO {

  /**
   * Goal's UUID
   */
  public uuid: string;

  /**
   * Student's UUID @User.uuid
   */
  public studentUuid: string;

  /**
   * Metrics @GoalMetrics.uuid
   */
  public metrics: string[];

  /**
   * Description of goal
   */
  public description: string;

  /**
   * Enum @Time.unit
   */
  public timeUnit: TimeUnitDTO;

  /**
    * Estimation time for complete goal
    */
  public estimationTime: number;

  constructor(goalData: GoalDTO) {
    this.uuid = goalData.uuid;
    this.studentUuid = goalData.studentUuid;
    this.metrics = goalData.metrics;
    this.description = goalData.description;
    this.timeUnit = goalData.timeUnit;
    this.estimationTime = goalData.estimationTime;
  }

}
