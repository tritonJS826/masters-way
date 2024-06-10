import {makeAutoObservable} from "mobx";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {DayReport} from "src/model/businessModel/DayReport";
import {Label} from "src/model/businessModel/Label";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {UserPreviewShort} from "src/model/businessModelPreview/UserPreviewShort";
import {WayTag} from "src/model/businessModelPreview/WayTag";

/**
 * Way props
 */
interface WayProps {

  /**
   * Way's UUID
   */
  uuid: string;

  /**
   * Way's name
   */
  name: string;

  /**
   * Day reports
   */
  dayReports: DayReport[];

  /**
   * Way's owner
   */
  owner: UserPreviewShort;

  /**
   * Mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  mentors: Map<string, UserPlain>;

  /**
   * Former mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  formerMentors: Map<string, UserPlain>;

  /**
   * Users who sent request to become Way's mentor
   */
  mentorRequests: UserPlain[];

  /**
   * Way's status "Completed", "In progress", "Abandoned"
   */
  status: WayStatusType;

  /**
   * Last day when way was updated
   */
  lastUpdate: Date;

  /**
   * Users for whom this way are favorite
   */
  favoriteForUsersAmount: number;

  /**
   * Date when way was created
   */
  createdAt: Date;

  /**
   * Way's tags {@link WayTag}
   */
  wayTags: WayTag[];

  /**
   * Tags that was used for jobDone {@link Label}
   */
  jobTags: Label[];

  /**
   * Way's uuid that was copied
   */
  copiedFromWayUuid: string | null;

  /**
   * Description of goal
   */
  goalDescription: string;

  /**
   * Estimation time for complete goal
   */
  estimationTime: number;

  /**
   * Stringified metrics objects {@link MetricDTO}
   */
  metrics: Metric[];

  /**
   * Is way private
   * @default false
   */
  isPrivate: boolean;

  /**
   * If Way has children then this way is Composite
   */
  children: Way[];
}

/**
 * Way model
 */
export class Way {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Way's name
   */
  public name: string;

  /**
   * Day reports
   */
  public dayReports: DayReport[];

  /**
   * Way's owner
   */
  public owner: UserPreviewShort;

  /**
   * Mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  public mentors: Map<string, UserPlain>;

  /**
   * Former mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  public formerMentors: Map<string, UserPlain>;

  /**
   * Users who sent request to become Way's mentor
   */
  public mentorRequests: UserPlain[];

  /**
   * Way's status "Completed", "In progress", "Abandoned"
   */
  public status: WayStatusType;

  /**
   * Last day when way was updated
   */
  public lastUpdate: Date;

  /**
   * Users for whom this way are favorite
   */
  public favoriteForUsersAmount: number;

  /**
   * Date when way was created
   */
  public createdAt: Date;

  /**
   * Way's tags {@link WayTag}
   */
  public wayTags: WayTag[];

  /**
   * Tags that was used for jobDone {@link Label}
   */
  public jobTags: Label[];

  /**
   * Way's uuid that was copied
   */
  public copiedFromWayUuid: string | null;

  /**
   * Description of goal
   */
  public goalDescription: string;

  /**
   * Estimation time for complete goal
   */
  public estimationTime: number;

  /**
   * Stringified metrics objects {@link MetricDTO}
   */
  public metrics: Metric[];

  /**
   * Is way private
   * @default false
   */
  public isPrivate: boolean;

  /**
   * If Way has children then this way is Composite
   */
  public children: Way[];

  constructor(wayData: WayProps) {
    makeAutoObservable(this);
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReports = wayData.dayReports.map(report => new DayReport(report));
    this.owner = new UserPreviewShort(wayData.owner);
    this.mentors = new Map<string, UserPlain>(wayData.mentors);
    this.mentorRequests = wayData.mentorRequests.map(mentorRequest => new UserPlain(mentorRequest));
    this.status = wayData.status;
    this.lastUpdate = wayData.lastUpdate;
    this.favoriteForUsersAmount = wayData.favoriteForUsersAmount;
    this.createdAt = wayData.createdAt;
    this.wayTags = wayData.wayTags.map(wayTag => new WayTag(wayTag));
    this.jobTags = wayData.jobTags.map(jobTag => new Label(jobTag));
    this.formerMentors = new Map<string, UserPlain>(wayData.formerMentors);
    this.copiedFromWayUuid = wayData.copiedFromWayUuid;
    this.goalDescription = wayData.goalDescription;
    this.estimationTime = wayData.estimationTime;
    this.metrics = wayData.metrics.map(metric => new Metric(metric));
    this.isPrivate = wayData.isPrivate;
    this.children = wayData.children.map(child => new Way(child));
  }

  /**
   * Update way's name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
  }

  /**
   * Update way's isPrivate
   */
  public updateIsPrivate(isPrivateToUpdate: boolean): void {
    this.isPrivate = isPrivateToUpdate;
  }

  /**
   * Update way's goal
   */
  public updateGoalDescription(goalDescriptionToUpdate: string): void {
    this.goalDescription = goalDescriptionToUpdate;
  }

  /**
   * Add user to mentorRequests
   */
  public addUserToMentorRequests(userForMentorRequest: UserPlain): void {
    this.mentorRequests.push(userForMentorRequest);
  }

  /**
   * Delete user from mentorRequests
   */
  public deleteUserFromMentorRequests(userUuid: string): void {
    this.mentorRequests = this.mentorRequests.filter(mentor => mentor.uuid !== userUuid);
  }

  /**
   * Add user to mentors
   */
  public addUserToMentors(user: UserPlain): void {
    this.mentorRequests = this.mentorRequests.filter(mentor => mentor.uuid !== user.uuid);
    this.mentors.set(user.uuid, user);
    this.formerMentors = new Map(Array.from(this.formerMentors)
      .filter(([formerMentorUuid]) => formerMentorUuid !== user.uuid));
  }

  /**
   * Add new label to way
   */
  public addLabel(newLabel: Label): void {
    this.jobTags.push(newLabel);
  }

  /**
   * Delete label from way
   */
  public deleteLabel(labelUuid: string): void {
    this.jobTags = this.jobTags.filter(label => label.uuid !== labelUuid);
  }

  /**
   * Update way's favoriteForUsersAmount
   */
  public updateFavoriteForUsersAmount(favoriteAmount: number): void {
    this.favoriteForUsersAmount = favoriteAmount;
  }

  /**
   * Add new tag to way
   */
  public addTag(newTag: WayTag): void {
    this.wayTags.push(newTag);
  }

  /**
   * Delete tag from way
   */
  public deleteTag(wayTagUuid: string): void {
    this.wayTags = this.wayTags.filter(tag => tag.uuid !== wayTagUuid);
  }

  /**
   * Add new metric to way
   */
  public addMetric(newMetric: Metric): void {
    this.metrics.push(newMetric);
  }

  /**
   * Delete metric from way
   */
  public deleteMetric(metricUuid: string): void {
    this.metrics = this.metrics.filter(metric => metric.uuid !== metricUuid);
  }

  /**
   * Add dayReport
   */
  public addDayReport(dayReport: DayReport): void {
    this.dayReports.unshift(dayReport);
  }

  /**
   * Add dayReport
   */
  public updateDayReports(dayReports: DayReport[]): void {
    this.dayReports = dayReports;
  }

}
