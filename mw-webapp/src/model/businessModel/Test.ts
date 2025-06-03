import {makeAutoObservable} from "mobx";

/**
 * Question props
 */
interface QuestionProps {

  /**
   * Question's UUID
   */
  uuid: string;

  /**
   * Question's answer
   */
  answer: string;

  /**
   * Last day when question was updated
   */
  updatedAt: Date;

  /**
   * Date when question was created
   */
  createdAt: Date;

  /**
   * If true - user answering on this question
   */
  isActive: boolean;

  /**
   * Question's order
   */
  order: number;

  /**
   * Question's text
   */
  questionText: string;

  /**
   * Test's UUID
   */
  testUuid: string;

  /**
   * Question's time to answer
   */
  timeToAnswer: number;

}

/**
 * Question model
 */
export class Question {

  /**
   * Question's UUID
   */
  public uuid: string;

  /**
   * Question's answer
   */
  public answer: string;

  /**
   * Last day when question was updated
   */
  public updatedAt: Date;

  /**
   * Date when question was created
   */
  public createdAt: Date;

  /**
   * If true - user answering on this question
   */
  public isActive: boolean;

  /**
   * Question's order
   */
  public order: number;

  /**
   * Question's text
   */
  public questionText: string;

  /**
   * Test's UUID
   */
  public testUuid: string;

  /**
   * Question's time to answer
   */
  public timeToAnswer: number;

  constructor(questionData: QuestionProps) {
    makeAutoObservable(this);
    this.uuid = questionData.uuid;
    this.answer = questionData.answer;
    this.createdAt = questionData.createdAt;
    this.updatedAt = questionData.updatedAt;
    this.isActive = questionData.isActive;
    this.order = questionData.order;
    this.questionText = questionData.questionText;
    this.testUuid = questionData.testUuid;
    this.timeToAnswer = questionData.timeToAnswer;
  }

  /**
   * Update test's name
   */
  public updateName(nameToUpdate: string): void {
    this.questionText = nameToUpdate;
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

/**
 * Test props
 */
interface TestProps {

  /**
   * Test's UUID
   */
  uuid: string;

  /**
   * Test's name
   */
  name: string;

  /**
   * Test's description
   */
  description: string;

  /**
   * Test's owner UUID
   */
  ownerUuid: string;

  /**
   * Last day when test was updated
   */
  updatedAt: Date;

  /**
   * Date when test was created
   */
  createdAt: Date;

  /**
   * Test's questions
   */
  questions: Question[];

}

/**
 * Test model
 */
export class Test {

  /**
   * Test's UUID
   */
  public uuid: string;

  /**
   * Test's name
   */
  public name: string;

  /**
   * Test's description
   */
  public description: string;

  /**
   * Test's owner UUID
   */
  public ownerUuid: string;

  /**
   * Last day when training was updated
   */
  public updatedAt: Date;

  /**
   * Date when training was created
   */
  public createdAt: Date;

  /**
   * Test's questions
   */
  public questions: Question[];

  constructor(testData: TestProps) {
    makeAutoObservable(this);
    this.uuid = testData.uuid;
    this.name = testData.name;
    this.description = testData.description;
    this.ownerUuid = testData.ownerUuid;
    this.createdAt = testData.createdAt;
    this.updatedAt = testData.updatedAt;
    this.questions = testData.questions.map(question => new Question(question));
  }

  /**
   * Update test's name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
  }

  /**
   * Update test's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Add new question to test
   */
  public addQuestion(newTest: Question): void {
    this.questions.push(newTest);
  }

  /**
   * Delete question from test
   */
  public deleteQuestion(questionUuid: string): void {
    this.questions = this.questions.filter(question => question.uuid !== questionUuid);
  }

}
