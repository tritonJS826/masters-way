import {makeAutoObservable} from "mobx";

/**
 * Comment's props
 */
interface CommentProps {

    /**
     * Comment's UUID
     */
    uuid: string;

    /**
     * Commentator's name
     */
    ownerName: string;

    /**
     * Commentator's uuid
     */
    ownerUuid: string;

    /**
     * Comment's text
     */
    description: string;

    /**
     * Comment's created at date
     */
    createdAt: Date;

    /**
     * Comment's created at date
     */
    updatedAt: Date;

    /**
     * Comment's dayReport UUID
     */
    dayReportUuid: string;
}

/**
 * User's comments model
 */
export class Comment {

  /**
   * Comment's UUID
   */
  public uuid: string;

  /**
   * Commentator's name
   */
  public ownerName: string;

  /**
   * Commentator's uuid
   */
  public ownerUuid: string;

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

  constructor(commentData: CommentProps) {
    makeAutoObservable(this);
    this.uuid = commentData.uuid;
    this.ownerName = commentData.ownerName;
    this.ownerUuid = commentData.ownerUuid;
    this.description = commentData.description;
    this.createdAt = commentData.createdAt;
    this.updatedAt = commentData.updatedAt;
    this.dayReportUuid = commentData.dayReportUuid;
  }

  /**
   * Update comment's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

}
