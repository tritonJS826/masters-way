/**
 * User's comments model
 */
export class Comment {

  /**
   * Comment's UUID
   */
  public uuid: string;

  /**
   * Commentator's uuid
   */
  public commentatorUuid: string;

  /**
   * Comment's text
   */
  public description: string;

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  constructor(commentData: Comment) {
    this.uuid = commentData.uuid;
    this.commentatorUuid = commentData.commentatorUuid;
    this.description = commentData.description;
    this.isDone = commentData.isDone;
  }

}
