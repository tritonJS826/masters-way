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

  /**
   * Add new metric
   * @returns new @GoalMetrics
   */
  // public addMetric(description: string) {
  //   return new GoalMetric({
  //     uuid: this.uuid,
  //     description: this.description.concat(description),
  //     metricUuids: this.metricUuids.concat(uuidv4()),
  //     isDone: this.isDone.concat(false),
  //     doneDate: this.doneDate.concat(new Date()),
  //   });
  // }

  /**
   * @returns new @GoalMetrics
   */
  // public removeMetric(metricUuid: string) {
  //   const indexToRemove = this.metricUuids.indexOf(metricUuid);
  //   const INDEX_FOR_NOT_EXISTING_UUID = -1;
  //   if (indexToRemove === INDEX_FOR_NOT_EXISTING_UUID) {
  //     throw new Error(`wrong uuid: ${metricUuid}`);
  //   }

  //   const DEFAULT_LENGTH_TO_REMOVE = 1;

  //   return new GoalMetric({
  //     uuid: this.uuid,
  //     description: this.description.splice(indexToRemove, DEFAULT_LENGTH_TO_REMOVE),
  //     metricUuids: this.metricUuids.splice(indexToRemove, DEFAULT_LENGTH_TO_REMOVE),
  //     isDone: this.isDone.splice(indexToRemove, DEFAULT_LENGTH_TO_REMOVE),
  //     doneDate: this.doneDate.splice(indexToRemove, DEFAULT_LENGTH_TO_REMOVE),
  //   });
  // }

}
