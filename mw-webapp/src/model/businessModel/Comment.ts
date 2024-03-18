import {SchemasUserPlainResponse} from "src/apiAutogenerated";

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
  public owner: SchemasUserPlainResponse;

  /**
   * Comment's text
   */
  public description: string;

  constructor(commentData: Comment) {
    this.uuid = commentData.uuid;
    this.owner = commentData.owner;
    this.description = commentData.description;
  }

}
