import {makeAutoObservable} from "mobx";
import {UserPlain} from "src/model/businessModel/User";
import {TrainingTag} from "src/model/businessModelPreview/TrainingPreview";

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

  constructor(trainingTopic: TrainingTopicProps) {
    makeAutoObservable(this);
    this.name = trainingTopic.name;
    this.uuid = trainingTopic.uuid;
    this.order = trainingTopic.order;
    this.parentUuid = trainingTopic.parentUuid;
    this.children = trainingTopic.children;
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
  owner: UserPlain;

  /**
   * Last day when training was updated
   */
  updatedAt: Date;

  /**
   * Date when training was created
   */
  createdAt: Date;

  /**
   * Users for whom this way are favorite
   */
  favoriteForUsersAmount: number;

  /**
   * Mentors of this training
   * @key @User.uuid
   * @value @UserPreview
   */
  mentors: Map<string, UserPlain>;

  /**
   * Training's students
   */
  studentIds: string[];

  /**
   * Training's tags {@link TrainingTagTag}
   */
  trainingTags: TrainingTag[];

  /**
   * Training's topics
   */
  topics: TrainingTopic[];

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
  public owner: UserPlain;

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
  public mentors: Map<string, UserPlain>;

  /**
   * Training's students
   */
  public studentIds: string[];

  /**
   * Training's tags {@link TrainingTagTag}
   */
  public trainingTags: TrainingTag[];

  constructor(trainingData: TrainingProps) {
    makeAutoObservable(this);
    this.uuid = trainingData.uuid;
    this.name = trainingData.name;
    this.description = trainingData.description;
    this.isPrivate = trainingData.isPrivate;
    this.studentIds = trainingData.studentIds;
    this.mentors = trainingData.mentors;
    this.trainingTags = trainingData.trainingTags;
    this.owner = trainingData.owner;
    this.createdAt = trainingData.createdAt;
    this.updatedAt = trainingData.updatedAt;
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
  public addStudentToTraining(userId: string): void {
    this.studentIds.push(userId);
  }

  /**
   * Delete student from training
   */
  public deleteStudentFromTraining(userUuid: string): void {
    this.studentIds = this.studentIds.filter(userId => userId !== userUuid);
  }

}
