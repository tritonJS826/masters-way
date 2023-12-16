const ADD_METRIC_KEY = "addMetric";
const REMOVE_METRIC_KEY = "removeMetric";
type GoalMetricConstructorParams = Omit<GoalMetric, typeof ADD_METRIC_KEY | typeof REMOVE_METRIC_KEY>;

/**
 * Goal's metrics model
 */
export class GoalMetric {

  /**
   * Metric's UUID
   */
  public uuid: string;

  /**
   * List of metric uuids
   */
  public metricUuids: string[];

  /**
   * Metrics's description
   */
  public description: string[];

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean[];

  /**
   * Time when goal metric was done
   */
  public doneDate: Date[];

  constructor(goalMetricData: GoalMetricConstructorParams) {
    this.uuid = goalMetricData.uuid;
    this.description = goalMetricData.description;
    this.isDone = goalMetricData.isDone;
    this.doneDate = goalMetricData.doneDate;
    this.metricUuids = goalMetricData.metricUuids;
  }

}
