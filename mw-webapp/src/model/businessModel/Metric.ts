/**
 * Metrics model
 */
export class Metric {

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

  /**
   * Time when goal metric was done
   */
  public doneDate: Date | null;

  constructor(goalMetricData: Metric) {
    this.uuid = goalMetricData.uuid;
    this.description = goalMetricData.description;
    this.isDone = goalMetricData.isDone;
    this.doneDate = goalMetricData.doneDate;
  }

}
