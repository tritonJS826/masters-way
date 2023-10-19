import {TimeUnit} from "src/model/businessModelPreview/time/timeUnit/TimeUnit";

/**
 * Goal preview model
 */
export class GoalPreview {

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
  public metricUuids: string[];

  /**
   * Description of goal
   */
  public description: string;

  /**
   * Enum @Time.unit for {@link estimationTime}
   */
  public timeUnit: TimeUnit;

  /**
   * Estimation time for complete goal
   */
  public estimationTime: number;

  constructor(goalData: GoalPreview) {
    this.uuid = goalData.uuid;
    this.studentUuid = goalData.studentUuid;
    this.metricUuids = goalData.metricUuids;
    this.description = goalData.description;
    this.timeUnit = goalData.timeUnit;
    this.estimationTime = goalData.estimationTime;
  }

}
