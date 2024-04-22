import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {WayTag} from "src/model/businessModelPreview/WayTag";

/**
 * Way not saturated user model
 */
export class WayNotSaturatedUser {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Way's name
   */
  public name: string;

  /**
   * Day reports uuids @DayReport.uuid
   */
  public dayReportUuids: string[];

  /**
   * Way's owner
   */
  public owner: UserNotSaturatedWay;

  /**
   * Mentors of this way
   */
  public mentors: string[];

  /**
   * Former mentor's UUIDs @User.uuid
   */
  public formerMentorUuids: string[];

  /**
   * Users who sent request to become Way's mentor
   */
  public mentorRequests: string[];

  /**
   * Way's status "Completed" or "Template"
   * @default null
   */
  public status: string | null;

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
   * Way's tags {@link WayTag}
   */
  public wayTags: WayTag[];

  /**
   * Tags that was used for jobDone {@link JobTag}
   */
  public jobTags: JobTag[];

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
  public metricsStringified: string[];

  constructor(wayData: WayNotSaturatedUser) {
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReportUuids = wayData.dayReportUuids;
    this.owner = wayData.owner;
    this.mentors = wayData.mentors;
    this.mentorRequests = wayData.mentorRequests;
    this.status = wayData.status;
    this.lastUpdate = wayData.lastUpdate;
    this.favoriteForUserUuids = wayData.favoriteForUserUuids;
    this.createdAt = wayData.createdAt;
    this.wayTags = wayData.wayTags;
    this.jobTags = wayData.jobTags;
    this.formerMentorUuids = wayData.formerMentorUuids;
    this.copiedFromWayUuid = wayData.copiedFromWayUuid;
    this.goalDescription = wayData.goalDescription;
    this.estimationTime = wayData.estimationTime;
    this.metricsStringified = wayData.metricsStringified;
  }

}
