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
  public ownerUuid: string;

  /**
   * Comment's text
   */
  public description: string;

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  /**
   * Comment's tags
   */
  public tags: string[];

  constructor(commentData: Comment) {
    this.uuid = commentData.uuid;
    this.ownerUuid = commentData.ownerUuid;
    this.description = commentData.description;
    this.isDone = commentData.isDone;
    this.tags = commentData.tags;
  }

}