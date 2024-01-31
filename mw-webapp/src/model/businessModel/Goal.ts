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
   * Description of goal
   */
  public description: string;

  /**
   * How long will the goal done (minutes)
   */
  public estimationTime: number;

  /**
   * Goal's metrics
   */
  public metrics: Metric[];

  constructor(goalData: Goal) {
    this.uuid = goalData.uuid;
    this.student = goalData.student;
    this.description = goalData.description;
    this.estimationTime = goalData.estimationTime;
    this.metrics = goalData.metrics;
  }

}
