/**
 * Question result for unity
 */
export type QuestionResultReactToUnity = {

  /**
   * Is right answer
   */
  isOk: boolean;

  /**
   * User's uuid
   */
  userUuid: string;

  /**
   * User's uuid
   */
  userAnswer: string;

  /**
   * Question's name
   */
  questionName: string;

  /**
   * Question's description
   */
  questionDescription: string;

  /**
   * Question's answer settled by creator
   */
  questionAnswer: string;

  /**
   * Question's result description from mentor or AI
   */
  resultDescription: string;

  /**
   * Question's uuid
   */
  questionUuid: string;

  /**
   * Question result uuid (just technical thing)
   */
  uuid: string;
}
