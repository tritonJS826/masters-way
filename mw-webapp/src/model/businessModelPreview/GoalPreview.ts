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
   * Estimation time for complete goal
   */
  public estimationTime: number;

  /**
   * Stringified metrics objects
   */
  public metricsStringified?: string[];

  constructor(goalData: GoalPreview) {
    this.uuid = goalData.uuid;
    this.studentUuid = goalData.studentUuid;
    this.metricUuids = goalData.metricUuids;
    this.description = goalData.description;
    this.estimationTime = goalData.estimationTime;
    this.metricsStringified = goalData.metricsStringified;
  }

}
