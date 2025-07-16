import {makeAutoObservable} from "mobx";

/**
 * Question result props
 */
export interface QuestionResultProps {

  /**
   * QuestionResult's UUID
   */
  uuid: string;

  /**
   * If true the answer on the question is right
   */
  isOk: boolean;

  /**
   * User's UUID
   */
  userUuid: string;

  /**
   * User's answer
   */
  userAnswer: string;

  /**
   * User's image url
   */
  userImageUrl: string;

  /**
   * User's name
   */
  userName: string;

  /**
   * Question's UUID
   */
  questionUuid: string;

  /**
   * Question's right answer
   */
  questionAnswer: string;

  /**
   * Question's name
   */
  questionName: string;

  /**
   * Question's description
   */
  questionDescription: string;

  /**
   * Question result description
   */
  resultDescription: string;

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
   * If true the answer on the question is right
   */
  public isOk: boolean;

  /**
   * User's UUID
   */
  public userUuid: string;

  /**
   * User's answer
   */
  public userAnswer: string;

  /**
   * User's image url
   */
  public userImageUrl: string;

  /**
   * User's name
   */
  public userName: string;

  /**
   * Question's UUID
   */
  public questionUuid: string;

  /**
   * Question's right answer
   */
  public questionAnswer: string;

  /**
   * Question's name
   */
  public questionName: string;

  /**
   * Question's description
   */
  public questionDescription: string;

  /**
   * Question result description
   */
  public resultDescription: string;

  constructor(questionResultData: QuestionResultProps) {
    makeAutoObservable(this);
    this.uuid = questionResultData.uuid;
    this.userAnswer = questionResultData.userAnswer;
    this.userUuid = questionResultData.userUuid;
    this.userImageUrl = questionResultData.userImageUrl;
    this.userName = questionResultData.userName;
    this.questionAnswer = questionResultData.questionAnswer;
    this.questionUuid = questionResultData.questionUuid;
    this.resultDescription = questionResultData.resultDescription;
    this.questionName = questionResultData.questionName;
    this.isOk = questionResultData.isOk;
    this.questionDescription = questionResultData.questionDescription;
  }

}
