/**
 * Student comment
 */
export class StudentComment {

  /**
   * Comment's text
   */
  public description: string;

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  constructor(studentCommentData: StudentComment) {
    this.description = studentCommentData.description;
    this.isDone = studentCommentData.isDone;
  }

}
