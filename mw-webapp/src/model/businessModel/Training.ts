import {makeAutoObservable} from "mobx";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {TrainingTag, UserPreview} from "src/model/businessModelPreview/TrainingPreview";

/**
 * Add topic recursively
 */
const addTopicRecursive = (topic: TopicPreview, newTopic: TopicPreview): TopicPreview => {
  return new TopicPreview({
    ...topic,
    children: topic.uuid === newTopic.parentUuid
      ? [...topic.children, newTopic]
      : topic.children.map(child => addTopicRecursive(child, newTopic)),
  });
};

/**
 * Delete topic recursively
 */
const deleteTopicRecursively = (topic: TopicPreview, topicUuid: string) => {
  topic.children = topic.children.filter(child => {
    if (child.uuid === topicUuid) {
      return false;
    } else {
      deleteTopicRecursively(child, topicUuid);

      return true;
    }
  });

};

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
  topics: TopicPreview[];

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
  public topics: TopicPreview[];

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

  /**
   * Add user to training favorites
   */
  public addUserToTrainingFavorites(userUuid: string): void {
    this.favoriteForUserUuids.push(userUuid);
  }

  /**
   * Delete user from training favorites
   */
  public deleteUserFromTrainingFavorites(userUuid: string): void {
    this.favoriteForUserUuids = this.favoriteForUserUuids.filter(uuid => uuid !== userUuid);
  }

  /**
   * Update training's isPrivate
   */
  public updateIsPrivate(isPrivateToUpdate: boolean): void {
    this.isPrivate = isPrivateToUpdate;
  }

  /**
   * Delete tag from training
   */
  public deleteTag(trainingTagName: string): void {
    this.trainingTags = this.trainingTags.filter(tag => tag.name !== trainingTagName);
  }

  /**
   * Add new tag to training
   */
  public addTag(newTag: TrainingTag): void {
    this.trainingTags.push(newTag);
  }

  /**
   * Update training's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Add new topic to training
   */
  public addTopic(newTopic: TopicPreview): void {
    newTopic.parentUuid
      ? this.topics = this.topics.map(topic => addTopicRecursive(topic, newTopic))
      : this.topics.push(newTopic);
  }

  /**
   * Delete topic from training
   */
  public deleteTopic(topicUuid: string): void {
    this.topics = this.topics.filter(topic => topic.uuid !== topicUuid);
    this.topics.forEach(topic => deleteTopicRecursively(topic, topicUuid));
  }

}
