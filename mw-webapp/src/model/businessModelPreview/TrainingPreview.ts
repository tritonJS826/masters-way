import {makeAutoObservable} from "mobx";

/**
 * Training tag data
 */
export class TrainingTag {

  /**
   * Training tag uuid
   */
  public uuid: string;

  /**
   * Training tag name
   */
  public name: string;

  constructor(trainingTag: TrainingTag) {
    makeAutoObservable(this);
    this.name = trainingTag.name;
    this.uuid = trainingTag.uuid;
  }

}

/**
 * UserPreview data
 */
export class UserPreview {

  /**
   * User's uuid
   */
  public uuid: string;

  /**
   * User's name
   */
  public name: string;

  /**
   * User's image path
   */
  public imageUrl: string;

  constructor(userPreview: UserPreview) {
    makeAutoObservable(this);
    this.name = userPreview.name;
    this.uuid = userPreview.uuid;
    this.imageUrl = userPreview.imageUrl;
  }

}

/**
 * TrainingPreview props
 */
interface TrainingPreviewProps {

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
   * Users for whom this way are favorite
   */
  favoriteForUsersAmount: number;

  /**
   * Mentors of this training
   * @key @User.uuid
   * @value @UserPreview
   */
  mentors: UserPreview[];

  /**
   * Training's students
   */
  studentsAmount: number;

  /**
   * Training's tags {@link TrainingTagTag}
   */
  trainingTags: TrainingTag[];

  /**
   * Topic's amount
   */
  topicsAmount: number;

}

/**
 * TrainingPreview model
 */
export class TrainingPreview {

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
   * Users for whom this way are favorite
   */
  public favoriteForUsersAmount: number;

  /**
   * Mentors of this training
   * @key @User.uuid
   * @value @UserPreview
   */
  public mentors: UserPreview[];

  /**
   * Training's students
   */
  public studentsAmount: number;

  /**
   * Training's tags {@link TrainingTagTag}
   */
  public trainingTags: TrainingTag[];

  /**
   * Topic's amount
   */
  public topicsAmount: number;

  constructor(trainingPreviewData: TrainingPreviewProps) {
    makeAutoObservable(this);
    this.uuid = trainingPreviewData.uuid;
    this.name = trainingPreviewData.name;
    this.description = trainingPreviewData.description;
    this.isPrivate = trainingPreviewData.isPrivate;
    this.studentsAmount = trainingPreviewData.studentsAmount;
    this.mentors = trainingPreviewData.mentors;
    this.trainingTags = trainingPreviewData.trainingTags;
    this.owner = trainingPreviewData.owner;
    this.createdAt = trainingPreviewData.createdAt;
    this.updatedAt = trainingPreviewData.updatedAt;
    this.favoriteForUsersAmount = trainingPreviewData.favoriteForUsersAmount;
    this.topicsAmount = trainingPreviewData.topicsAmount;
  }

}
