import {WorkDone} from "src/model/report/workDone/WorkDone";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Time} from "./time/Time";
import {Unit} from "src/model/report/time/unit/Unit";

/**
 * Case for one row in the table
 */
export class Report {

  /**
   * Case's ID
   */
  public id: string;

  /**
   * Date, when case was done in ISO format
   */
  public date: Date;

  /**
   * What was done
   */
  public workDone: WorkDone[];

  /**
   * What will be done tomorrow
   */
  public planForTomorrow: PlanForTomorrow[];

  /**
   * What the user could not do or did with difficulty (it took a very long time)
   */
  public currentProblems: string[];

  /**
   * Anything that user wants to say about work
   */
  public studentComment: string[];

  /**
   * New knowledge that the user has received
   */
  public learnedForToday: string[];

  /**
   * Comments about work day from mentor
   */
  public mentorComment: string[];

  /**
   * true if today is day off and false if today is working day
   */
  public isDayOff: boolean;

  constructor(reportDate: {
    id: string,
    date: Date,
    workDone: { id: string, todoItem: string, time: { unit: Unit, amount: number } }[],
    planForTomorrow: { id: string, todoItem: string, time: { unit: Unit, amount: number } }[],
    currentProblems: string[],
    studentComment: string[],
    learnedForToday: string[],
    mentorComment: string[],
    isDayOff: boolean,
  }) {
    this.id = reportDate.id;
    this.date = reportDate.date;
    this.workDone = reportDate.workDone?.map((workDoneItem) =>
      new WorkDone(workDoneItem.id, workDoneItem.todoItem,
        new Time(workDoneItem.time.unit, workDoneItem.time.amount)));
    this.planForTomorrow = reportDate.planForTomorrow?.map((planForTomorrowItem) =>
      new PlanForTomorrow(planForTomorrowItem.id, planForTomorrowItem.todoItem,
        new Time(planForTomorrowItem.time.unit, planForTomorrowItem.time.amount)));
    this.currentProblems = reportDate.currentProblems;
    this.studentComment = reportDate.studentComment;
    this.learnedForToday = reportDate.learnedForToday;
    this.mentorComment = reportDate.mentorComment;
    this.isDayOff = reportDate.isDayOff;
    console.log(this.workDone?.map((workDoneItem) =>
      new WorkDone(workDoneItem.id, workDoneItem.todoItem, new Time(workDoneItem.time.unit, workDoneItem.time.amount))));
  }

}
