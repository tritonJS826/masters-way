/**
 * Goal's metrics
 */
export class GoalMetric {

  /**
   * Metric's UUID
   */
  public uuid: string;

  /**
   * Metrics's description
   */
  public description: string[];

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  constructor(mentorCommentData: GoalMetric) {
    this.uuid = mentorCommentData.uuid;
    this.description = mentorCommentData.description;
    this.isDone = mentorCommentData.isDone;
  }

}
