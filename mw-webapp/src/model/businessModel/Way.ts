import {DayReport} from "src/model/businessModel/DayReport";
import {Goal} from "src/model/businessModel/Goal";
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
   * Way's goal
   */
  public goal: Goal;

  /**
   * Mentors of this way
   */
  public mentors: UserPreview[];

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
  public favoriteForUsers: UserPreview[];

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

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.goal = wayData.goal;
    this.mentors = wayData.mentors;
    this.mentorRequests = wayData.mentorRequests;
    this.isCompleted = wayData.isCompleted;
    this.lastUpdate = wayData.lastUpdate;
    this.favoriteForUsers = wayData.favoriteForUsers;
    this.createdAt = wayData.createdAt;
    this.wayTags = wayData.wayTags;
    this.jobTags = wayData.jobTags;
  }

}
