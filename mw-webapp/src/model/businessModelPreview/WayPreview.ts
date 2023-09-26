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
  public goal: string;

  /**
   * Mentors of this way
   */
  public currentMentors: UserPreview[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: WayPreview) {
    this.uuid = wayData.uuid;
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.monthReports = wayData.monthReports;
    this.goal = wayData.goal;
    this.currentMentors = wayData.currentMentors?.map((currentMentorItem) =>
      new UserPreview(currentMentorItem));
    this.isCompleted = wayData.isCompleted;
  }

}
