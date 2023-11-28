/**
 * Goal's metrics model
 */
export class GoalMetric {

  /**
   * Metric's UUID
   */
  public uuid: string;

  /**
   * Metrics's description
   */
  public description: string[];

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  constructor(goalMetricData: GoalMetric) {
    this.uuid = goalMetricData.uuid;
    this.description = goalMetricData.description;
    this.isDone = goalMetricData.isDone;
  }

}
