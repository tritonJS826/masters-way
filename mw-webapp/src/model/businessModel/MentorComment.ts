/**
 * Mentor's comments
 */
export class MentorComment {

  /**
   * Comment's UUID
   */
  public uuid: string;

  /**
   * Mentor info
   *  TODO create mentor as User instead of mentorUuid
   * @User.uuid
   */
  public mentor: string;

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
