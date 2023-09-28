import {User} from "src/model/businessModel/User";

/**
 * Mentor's comments model
 */
export class MentorComment {

  /**
   * Comment's UUID
   */
  public uuid: string;

  /**
   * Mentor info
   */
  public mentor: User;

  /**
   * Comment's text
   */
  public description: string;

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  constructor(mentorCommentData: MentorComment) {
    this.uuid = mentorCommentData.uuid;
    this.mentor = mentorCommentData.mentor;
    this.description = mentorCommentData.description;
    this.isDone = mentorCommentData.isDone;
  }

}
