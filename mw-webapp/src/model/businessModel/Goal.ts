import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Time} from "src/model/businessModel/time/Time";
import {User} from "src/model/businessModel/User";

/**
 * Goal
 */
export class Goal {

  /**
   * Goal's UUID
   */
  public uuid: string;

  /**
   * Goal's user
   */
  public student: User;

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
    this.student = goalData.student;
    this.metrics = goalData.metrics;
    this.description = goalData.description;
    this.time = goalData.time;
  }

}
