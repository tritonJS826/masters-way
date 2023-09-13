import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Time} from "src/model/businessModel/time/Time";

/**
 * Goal of the way
 */
export class Goal {

  /**
   * Goal's UUID
   */
  public uuid: string;

  /**
   * Goal's user
   * TODO create student as User instead of studentUuid
   */
  // public student: User;

  /**
   * Student's UUID @User.uuid
   */
  public studentUuid: string;

  /**
   * Coal's metrics
   */
  public metrics: GoalMetric[];

  /**
   * Description of goal
   */
  public description: string;

  /**
   * How long was the goal done
   */
  public time: Time;

  constructor(goalData: Goal) {
    this.uuid = goalData.uuid;
    this.studentUuid = goalData.studentUuid;
    this.metrics = goalData.metrics;
    this.description = goalData.description;
    this.time = goalData.time;
  }

}
