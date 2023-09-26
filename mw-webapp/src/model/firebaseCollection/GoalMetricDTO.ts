/**
 * Goal's metrics DTO model
 */
export class GoalMetricDTO {

  /**
   * Metric's UUID
   */
  public uuid: string;

  /**
   * Metrics's description
   */
  public description: string;

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  constructor(goalMetricsData: GoalMetricDTO) {
    this.uuid = goalMetricsData.uuid;
    this.description = goalMetricsData.description;
    this.isDone = goalMetricsData.isDone;
  }

}
