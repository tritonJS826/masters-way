import {GoalMetric} from "src/model/businessModel/GoalMetric";
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

  constructor(goalData: Goal) {
    this.uuid = goalData.uuid;
    this.student = goalData.student;
    this.metrics = goalData.metrics;
    this.description = goalData.description;
    this.estimationTime = goalData.estimationTime;
  }

}
