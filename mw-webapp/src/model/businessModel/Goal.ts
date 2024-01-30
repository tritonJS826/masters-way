import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Metric} from "src/model/businessModel/Metric";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Goal model
 */
export class Goal {

  /**
   * Goal's UUID
   */
  public uuid: string;

  /**
   * Goal's user
   */
  public student: UserPreview;

  /**
   * Coal's metrics
   * @deprecated
   */
  public metrics: GoalMetric[];

  /**
   * Description of goal
   */
  public description: string;

  /**
   * How long will the goal done (minutes)
   */
  public estimationTime: number;

  /**
   * Coal's metrics
   * TODO: rename field to "metrics" after delete old field
   */
  public goalMetrics?: Metric[];

  constructor(goalData: Goal) {
    this.uuid = goalData.uuid;
    this.student = goalData.student;
    this.metrics = goalData.metrics;
    this.description = goalData.description;
    this.estimationTime = goalData.estimationTime;
    this.goalMetrics = goalData.goalMetrics;
  }

}
