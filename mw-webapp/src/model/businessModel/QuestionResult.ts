import {makeAutoObservable} from "mobx";

/**
 * Question result props
 */
interface QuestionResultProps {

  /**
   * QuestionResult's UUID
   */
  uuid: string;

  /**
   * Test's UUID
   */
  testUuid: string;

  /**
   * User's UUID
   */
  userUuid: string;

  /**
   * TestSession's UUID
   */
  testSessionUuid: string;

  /**
   * Question's UUID
   */
  questionUuid: string;

  /**
   * Question result description
   */
  resultDescription: string;

  /**
   * Date when question result was created
   */
  createdAt: Date;

  /**
   * If true the answer on the question is right
   */
  isOk: boolean;

}

/**
 * Question result model
 */
export class QuestionResult {

  /**
   * QuestionResult's UUID
   */
  public uuid: string;

  /**
   * Test's UUID
   */
  public testUuid: string;

  /**
   * User's UUID
   */
  public userUuid: string;

  /**
   * TestSession's UUID
   */
  public testSessionUuid: string;

  /**
   * Question's UUID
   */
  public questionUuid: string;

  /**
   * Question result description
   */
  public resultDescription: string;

  /**
   * Date when question result was created
   */
  public createdAt: Date;

  /**
   * If true the answer on the question is right
   */
  public isOk: boolean;

  constructor(questionResultData: QuestionResultProps) {
    makeAutoObservable(this);
    this.uuid = questionResultData.uuid;
    this.testUuid = questionResultData.testUuid;
    this.userUuid = questionResultData.userUuid;
    this.testSessionUuid = questionResultData.testSessionUuid;
    this.questionUuid = questionResultData.questionUuid;
    this.resultDescription = questionResultData.resultDescription;
    this.createdAt = questionResultData.createdAt;
    this.isOk = questionResultData.isOk;
  }

}
