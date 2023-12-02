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
   * Users who sent request to become Way's mentor
   */
  public mentorRequests: User[];

  /**
   * Return true if way is completed and false if not completed
   */
  public isCompleted: boolean;

  constructor(wayData: Way) {
    this.uuid = wayData.uuid;
    this.name = wayData.name;
    this.dayReports = wayData.dayReports;
    this.owner = wayData.owner;
    this.monthReports = wayData.monthReports;
    this.goal = wayData.goal;
    this.currentMentors = wayData.currentMentors.map((currentMentorItem) =>
      new User(currentMentorItem));
    this.mentorRequests = wayData.mentorRequests.map((mentorRequest) =>
      new User(mentorRequest));
    this.isCompleted = wayData.isCompleted;
  }

}
