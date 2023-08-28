import {GoalMetrics} from "src/model/businessModel/GoalMetrics";
import {Time} from "src/model/businessModel/time/Time";
import {User} from "src/model/businessModel/User";

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
   */
  public studentUuid: User;

  /**
   * Coal's metrics
   */
  public metrics: GoalMetrics;

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
    this.time = new Time(goalData.time.unit, goalData.time.amount);
  }

}
