import {WorkDone} from "src/model/report/workDone/WorkDone";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";

/**
 * Include all table columns
 */
export type TableColumns = {

  /**
   * Date, when case was done
   */
  date: Date;

  /**
   * What was done
   */
  workDone: WorkDone[];

  /**
   * What will be done tomorrow
   */
  planForTomorrow: PlanForTomorrow[];

  /**
   * What the user could not do or did with difficulty (it took a very long time)
   */
  currentProblems: string[];

  /**
   * Anything that user wants to say about work
   */
  studentComment: string[];

  /**
   * New knowledge that the user has received
   */
  learnedForToday: string[];

  /**
   * Comments about work day from mentor
   */
  mentorComment: string[];

  /**
   * true if today is day off and false if today is working day
   */
  isDayOff: boolean;

  /**
   * Summary time that user worked in period (day)
   */
  workHours: number;

}