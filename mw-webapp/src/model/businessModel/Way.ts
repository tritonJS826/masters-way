import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

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
  public owner: UserPreview;

  /**
   * Mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  public mentors: Map<string, UserPreview>;

  /**
   * Former mentors of this way
   * @key @User.uuid
   * @value @UserPreview
   */
  public formerMentors: Map<string, UserPreview>;

  /**
   * Users who sent request to become Way's mentor
   */
  public mentorRequests: UserPreview[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  /**
   * Last day when way was updated
   */
  public lastUpdate: Date;

  /**
   * Users for whom this way are favorite
   */
  public favoriteForUserUuids: string[];

  /**
   * Date when way was created
   */
  public createdAt: Date;

  /**
   * Way's tags
   */
  public wayTags: string[];

  /**
   * Tags that was used for jobDone
   */
  public jobTags: string[];

  /**
   * Way's uuid that was copied
   */
  public copiedFromWayUuid: string;

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

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.mentors = wayData.mentors;
    this.mentorRequests = wayData.mentorRequests;
    this.isCompleted = wayData.isCompleted;
    this.lastUpdate = wayData.lastUpdate;
    this.favoriteForUserUuids = wayData.favoriteForUserUuids;
    this.createdAt = wayData.createdAt;
    this.wayTags = wayData.wayTags;
    this.jobTags = wayData.jobTags;
    this.formerMentors = wayData.formerMentors;
    this.copiedFromWayUuid = wayData.copiedFromWayUuid;
    this.goalDescription = wayData.goalDescription;
    this.estimationTime = wayData.estimationTime;
    this.metrics = wayData.metrics;
  }

}
