import {makeAutoObservable} from "mobx";

/**
 * PracticeMaterial's props
 */
interface PracticeMaterialProps {

  /**
   * PracticeMaterial's UUID
   */
  uuid: string;

  /**
   * PracticeMaterial's name
   */
  name: string;

  /**
   * Date when PracticeMaterial was created
   */
  createdAt: Date;

  /**
   * Date when PracticeMaterial was updated
   */
  updatedAt: Date;

  /**
   * PracticeMaterial's topic's uuid
   */
  topicUuid: string;

  /**
   * PracticeMaterial's description
   */
  taskDescription: string;

  /**
   * PracticeMaterial's answer
   */
  answer: string;

  /**
   * PracticeMaterial's order
   */
  order: number;

  /**
   * PracticeMaterial's type
   */
  practiceType: string;

  /**
   * PracticeMaterial's time to answer
   */
  timeToAnswer: number;

}

/**
 * PracticeMaterial model
 */
export class PracticeMaterial {

  /**
   * PracticeMaterial's UUID
   */
  public uuid: string;

  /**
   * PracticeMaterial's name
   */
  public name: string;

  /**
   * Date when PracticeMaterial was created
   */
  public createdAt: Date;

  /**
   * Date when PracticeMaterial was updated
   */
  public updatedAt: Date;

  /**
   * PracticeMaterial's topic's uuid
   */
  public topicUuid: string;

  /**
   * PracticeMaterial's description
   */
  public taskDescription: string;

  /**
   * PracticeMaterial's answer
   */
  public answer: string;

  /**
   * PracticeMaterial's order
   */
  public order: number;

  /**
   * PracticeMaterial's type
   */
  public practiceType: string;

  /**
   * PracticeMaterial's time to answer
   */
  public timeToAnswer: number;

  constructor(practiceMaterialData: PracticeMaterialProps) {
    makeAutoObservable(this);
    this.uuid = practiceMaterialData.uuid;
    this.name = practiceMaterialData.name;
    this.createdAt = practiceMaterialData.createdAt;
    this.updatedAt = practiceMaterialData.updatedAt;
    this.topicUuid = practiceMaterialData.topicUuid;
    this.taskDescription = practiceMaterialData.taskDescription;
    this.answer = practiceMaterialData.answer;
    this.order = practiceMaterialData.order;
    this.practiceType = practiceMaterialData.practiceType;
    this.timeToAnswer = practiceMaterialData.timeToAnswer;
  }

}
