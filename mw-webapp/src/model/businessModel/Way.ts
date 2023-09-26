import {DayReport} from "src/model/businessModel/DayReport";
import {Goal} from "src/model/businessModel/Goal";
import {MonthReport} from "src/model/businessModel/MonthReport";
import {User} from "src/model/businessModel/User";

/**
 * Way model
 */
export class Way {

  /**
   * Way's UUID
   */
  public uuid: string;

  /**
   * Day reports
   */
  public dayReports: DayReport[];

  /**
   * Way's owner
   */
  public owner: User;

  /**
   * Month reports
   */
  public monthReports: MonthReport[];

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
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.monthReports = wayData.monthReports;
    this.goal = wayData.goal;
    this.currentMentors = wayData.currentMentors?.map((currentMentorItem) =>
      new User(currentMentorItem));
    this.isCompleted = wayData.isCompleted;
  }

}
