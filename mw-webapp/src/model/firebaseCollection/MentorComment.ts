/**
 * Mentor's comments
 */
export class MentorComment {

  /**
   * Comment's UUID
   */
  public uuid: string;

  /**
   * Mentor's UUID @User.uuid
   */
  public mentorUuid: string;

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
    this.mentorUuid = mentorCommentData.mentorUuid;
    this.description = mentorCommentData.description;
    this.isDone = mentorCommentData.isDone;
  }

}
