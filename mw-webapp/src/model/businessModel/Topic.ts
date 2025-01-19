import {makeAutoObservable} from "mobx";

/**
 * Topic props
 */
interface TopicProps {

  /**
   * Topic uuid
   */
  uuid: string;

  /**
   * Topic name
   */
  name: string;

  /**
   * Topic order
   */
  order: number;

  /**
   * Parent topic uuid
   */
  parentUuid: string | null;

  /**
   * Topic children
   */
  children: Topic[];

  /**
   * Topic's createdAt Date
   */
  createdAt: Date;

  /**
   * Practice material amount
   */
  practiceMaterialAmount: number;

  /**
   * Theory material amount
   */
  theoryMaterialAmount: number;

  /**
   * Training's uuid
   */
  trainingUuid: string;

}

/**
 * Topic data
 */
export class Topic {

  /**
   * Topic uuid
   */
  public uuid: string;

  /**
   * Topic name
   */
  public name: string;

  /**
   * Topic's order
   */
  public order: number;

  /**
   * Parent topic uuid
   */
  public parentUuid: string | null;

  /**
   * Topic children
   */
  public children: Topic[];

  /**
   * Topic's createdAt Date
   */
  public createdAt: Date;

  /**
   * Practice material amount
   */
  public practiceMaterialAmount: number;

  /**
   * Theory material amount
   */
  public theoryMaterialAmount: number;

  /**
   * Training's uuid
   */
  public trainingUuid: string;

  constructor(topic: TopicProps) {
    makeAutoObservable(this);
    this.name = topic.name;
    this.uuid = topic.uuid;
    this.order = topic.order;
    this.parentUuid = topic.parentUuid;
    this.children = topic.children;
    this.createdAt = topic.createdAt;
    this.practiceMaterialAmount = topic.practiceMaterialAmount;
    this.theoryMaterialAmount = topic.theoryMaterialAmount;
    this.trainingUuid = topic.trainingUuid;
  }

}
