import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Way preview model
 */
export class WayPreview {

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
  public dayReports: string[];

  /**
   * Way's owner
   */
  public owner: UserPreview;

  /**
   * Month reports uuids @MonthReport.uuid
   */
  public monthReports: string[];

  /**
   * Way's goal uuid @Goal.uuid
   */
  public goal: GoalPreview;

  /**
   * Mentors of this way
   */
  public currentMentors: UserPreview[];

  /**
   * Users who sent request to become Way's mentor
   */
  public mentorRequests: UserPreview[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: WayPreview) {
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.monthReports = wayData.monthReports;
    this.goal = wayData.goal;
    this.currentMentors = wayData.currentMentors.map((currentMentorItem) =>
      new UserPreview(currentMentorItem));
    this.mentorRequests = wayData.mentorRequests.map((mentorRequest) =>
      new UserPreview(mentorRequest));
    this.isCompleted = wayData.isCompleted;
  }

}
