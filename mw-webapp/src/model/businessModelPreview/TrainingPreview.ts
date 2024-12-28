import {makeAutoObservable} from "mobx";
import {UserPlain} from "src/model/businessModel/User";

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
  mentors: UserPlain[];

  /**
   * Training's students
   */
  studentIds: string[];

  /**
   * Training's tags {@link TrainingTagTag}
   */
  trainingTags: TrainingTag[];

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
   * Users for whom this way are favorite
   */
  public favoriteForUsersAmount: number;

  /**
   * Mentors of this training
   * @key @User.uuid
   * @value @UserPreview
   */
  public mentors: UserPlain[];

  /**
   * Training's students
   */
  public studentIds: string[];

  /**
   * Training's tags {@link TrainingTagTag}
   */
  public trainingTags: TrainingTag[];

  constructor(trainingPreviewData: TrainingPreviewProps) {
    makeAutoObservable(this);
    this.uuid = trainingPreviewData.uuid;
    this.name = trainingPreviewData.name;
    this.description = trainingPreviewData.description;
    this.isPrivate = trainingPreviewData.isPrivate;
    this.studentIds = trainingPreviewData.studentIds;
    this.mentors = trainingPreviewData.mentors;
    this.trainingTags = trainingPreviewData.trainingTags;
    this.owner = trainingPreviewData.owner;
    this.createdAt = trainingPreviewData.createdAt;
    this.updatedAt = trainingPreviewData.updatedAt;
    this.favoriteForUsersAmount = trainingPreviewData.favoriteForUsersAmount;
  }

}
