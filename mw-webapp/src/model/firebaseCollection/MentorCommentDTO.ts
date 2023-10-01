/**
 * Mentor's comments DTO model
 */
export class MentorCommentDTO {

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

  constructor(mentorCommentData: MentorCommentDTO) {
    this.uuid = mentorCommentData.uuid;
    this.mentorUuid = mentorCommentData.mentorUuid;
    this.description = mentorCommentData.description;
    this.isDone = mentorCommentData.isDone;
  }

}
