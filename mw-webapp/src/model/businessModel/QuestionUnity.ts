import {makeAutoObservable} from "mobx";

/**
 * Question for unity props
 */
interface QuestionUnityProps {

  /**
   * Question's UUID
   */
  uuid: string;

  /**
   * Question's name
   */
  name: string;

  /**
   * Question's answer
   */
  answer: string;

  /**
   * Question's order
   */
  order: number;

  /**
   * Question's text
   */
  questionText: string;

  /**
   * Question's time to answer
   */
  timeToAnswer: number;

}

/**
 * Question fot unity model
 */
export class QuestionUnity {

  /**
   * Question's UUID
   */
  public uuid: string;

  /**
   * Question's name
   */
  public name: string;

  /**
   * Question's answer
   */
  public answer: string;

  /**
   * Question's order
   */
  public order: number;

  /**
   * Question's text
   */
  public questionText: string;

  /**
   * Question's time to answer
   */
  public timeToAnswer: number;

  constructor(questionUnityData: QuestionUnityProps) {
    makeAutoObservable(this);
    this.uuid = questionUnityData.uuid;
    this.name = questionUnityData.name;
    this.answer = questionUnityData.answer;
    this.order = questionUnityData.order;
    this.questionText = questionUnityData.questionText;
    this.timeToAnswer = questionUnityData.timeToAnswer;
  }

  /**
   * Update test's answer
   */
  public updateAnswer(answerToUpdate: string): void {
    this.answer = answerToUpdate;
  }

  /**
   * Update test's time to answer
   */
  public updateTimeToAnswer(timeToUpdate: number): void {
    this.timeToAnswer = timeToUpdate;
  }

}
