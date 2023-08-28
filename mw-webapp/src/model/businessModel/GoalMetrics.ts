/**
 * Goal's metrics
 */
export class GoalMetrics {

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

  constructor(mentorCommentData: GoalMetrics) {
    this.uuid = mentorCommentData.uuid;
    this.description = mentorCommentData.description;
    this.isDone = mentorCommentData.isDone;
  }

}
