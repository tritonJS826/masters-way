import {DayReport} from "src/model/businessModel/DayReport";
import {MonthReport} from "src/model/businessModel/MonthReport";
import {User} from "src/model/businessModel/User";
import {Goal} from "src/model/businessModel/Goal";

/**
 * One of user's ways
 */
export class Way {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Day reports
   */
  public dayReport: DayReport[];

  /**
   * Way's owner
   */
  public owner: User;

  /**
   * Month reports
   */
  public monthReport: MonthReport[];

  /**
   * Way's goal
   */
  public goal: Goal;

  /**
   * Mentors of this way
   */
  public currentMentors: User[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.dayReport = wayData.dayReport;
    this.owner = wayData.owner;
    this.monthReport = wayData.monthReport;
    this.goal = wayData.goal;
    this.currentMentors = wayData.currentMentors?.map((currentMentorItem) =>
      new User(currentMentorItem));
    this.isCompleted = wayData.isCompleted;
  }

}
