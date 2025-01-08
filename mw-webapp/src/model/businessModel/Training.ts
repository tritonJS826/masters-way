import {makeAutoObservable} from "mobx";
import {TrainingTag, UserPreview} from "src/model/businessModelPreview/TrainingPreview";

/**
 * Training topic props
 */
interface TrainingTopicProps {

  /**
   * Training topic uuid
   */
  uuid: string;

  /**
   * Training topic name
   */
  name: string;

  /**
   * Training topic order
   */
  order: number;

  /**
   * Parent topic uuid
   */
  parentUuid: string | null;

  /**
   * Topic children
   */
  children: TrainingTopic[];

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
 * Training topic data
 */
export class TrainingTopic {

  /**
   * Training topic uuid
   */
  public uuid: string;

  /**
   * Training topic name
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
  public children: TrainingTopic[];

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

  constructor(trainingTopic: TrainingTopicProps) {
    makeAutoObservable(this);
    this.name = trainingTopic.name;
    this.uuid = trainingTopic.uuid;
    this.order = trainingTopic.order;
    this.parentUuid = trainingTopic.parentUuid;
    this.children = trainingTopic.children;
    this.createdAt = trainingTopic.createdAt;
    this.practiceMaterialAmount = trainingTopic.practiceMaterialAmount;
    this.theoryMaterialAmount = trainingTopic.theoryMaterialAmount;
    this.trainingUuid = trainingTopic.trainingUuid;
  }

}

/**
 * Training props
 */
interface TrainingProps {

  /**
   * Training's UUID
   */
  uuid: string;

  /**
   * Training's name
   */
  name: string;

  /**
   * Training's description
   */
  description: string;

  /**
   * Is training private
   * @default true
   */
  isPrivate: boolean;

  /**
   * Training's owner
   */
  owner: UserPreview;

  /**
   * Last day when training was updated
   */
  updatedAt: Date;

  /**
   * Date when training was created
   */
  createdAt: Date;

  /**
   * Mentors of this training
   * @key @User.uuid
   * @value @UserPreview
   */
  mentors: Map<string, UserPreview>;

  /**
   * Training's students
   */
  students: UserPreview[];

  /**
   * Training's tags {@link TrainingTagTag}
   */
  trainingTags: TrainingTag[];

  /**
   * Training's topics
   */
  topics: TrainingTopic[];

  /**
   * Favorite for user uuids
   */
  favoriteForUserUuids: string[];

}

/**
 * Training model
 */
export class Training {

  /**
   * Training's UUID
   */
  public uuid: string;

  /**
   * Training's name
   */
  public name: string;

  /**
   * Training's description
   */
  public description: string;

  /**
   * Is training private
   * @default true
   */
  public isPrivate: boolean;

  /**
   * Training's owner
   */
  public owner: UserPreview;

  /**
   * Last day when training was updated
   */
  public updatedAt: Date;

  /**
   * Date when training was created
   */
  public createdAt: Date;

  /**
   * Mentors of this training
   * @key @User.uuid
   * @value @UserPreview
   */
  public mentors: Map<string, UserPreview>;

  /**
   * Training's students
   */
  public students: UserPreview[];

  /**
   * Training's tags {@link TrainingTagTag}
   */
  public trainingTags: TrainingTag[];

  /**
   * Favorite for user uuids
   */
  public favoriteForUserUuids: string[];

  /**
   * Training's topics
   */
  public topics: TrainingTopic[];

  constructor(trainingData: TrainingProps) {
    makeAutoObservable(this);
    this.uuid = trainingData.uuid;
    this.name = trainingData.name;
    this.description = trainingData.description;
    this.isPrivate = trainingData.isPrivate;
    this.students = trainingData.students;
    this.mentors = trainingData.mentors;
    this.trainingTags = trainingData.trainingTags;
    this.owner = trainingData.owner;
    this.createdAt = trainingData.createdAt;
    this.updatedAt = trainingData.updatedAt;
    this.topics = trainingData.topics;
    this.favoriteForUserUuids = trainingData.favoriteForUserUuids;
  }

  /**
   * Update training's name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
  }

  /**
   * Add student to training
   */
  public addStudentToTraining(user: UserPreview): void {
    this.students.push(user);
  }

  /**
   * Delete student from training
   */
  public deleteStudentFromTraining(userUuid: string): void {
    this.students = this.students.filter(student => student.uuid !== userUuid);
  }

}
