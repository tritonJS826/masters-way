import {UserPreviewShort} from "src/model/businessModelPreview/UserPreviewShort";

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
  public owner: UserPreviewShort;

  /**
   * Comment's text
   */
  public description: string;

  /**
   * Comment's created at date
   */
  public createdAt: Date;

  /**
   * Comment's created at date
   */
  public updatedAt: Date;

  /**
   * Comment's dayReport UUID
   */
  public dayReportUuid: string;

  constructor(commentData: Comment) {
    this.uuid = commentData.uuid;
    this.owner = commentData.owner;
    this.description = commentData.description;
    this.createdAt = commentData.createdAt;
    this.updatedAt = commentData.updatedAt;
    this.dayReportUuid = commentData.dayReportUuid;
  }

}
