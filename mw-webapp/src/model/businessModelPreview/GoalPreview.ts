/**
 * Goal preview model
 */
export class GoalPreview {

  /**
   * Goal's UUID
   */
  public uuid: string;

  /**
   * Student's UUID @User.uuid
   */
  public studentUuid: string;

  /**
   * Description of goal
   */
  public description: string;

  /**
   * Estimation time for complete goal
   */
  public estimationTime: number;

  /**
   * Stringified metrics objects
   */
  public metricsStringified: string[];

  constructor(goalData: GoalPreview) {
    this.uuid = goalData.uuid;
    this.studentUuid = goalData.studentUuid;
    this.description = goalData.description;
    this.estimationTime = goalData.estimationTime;
    this.metricsStringified = goalData.metricsStringified;
  }

}
