import {WorkDone} from "src/model/report/workDone/WorkDone";
import {PlanForTomorrow} from "src/model/report/planForTomorrow/PLanForTomorrow";
import {Time} from "./time/Time";

/**
 * Case for one row in the table
 */
export class ReportDTO {

  /**
   * Case's ID
   */
  public id: string;

  /**
   * Date, when case was done in ISO format
   */
  public date: string;

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

  // constructor(reportDTODate: ReportDTO) {
  //   this.id = reportDTODate.id;
  //   this.date = reportDTODate.date;
  //   this.workDone = reportDTODate.workDone;
  //   this.planForTomorrow = reportDTODate.planForTomorrow;
  //   this.currentProblems = reportDTODate.currentProblems;
  //   this.studentComment = reportDTODate.studentComment;
  //   this.learnedForToday = reportDTODate.learnedForToday;
  //   this.mentorComment = reportDTODate.mentorComment;
  //   this.isDayOff = reportDTODate.isDayOff;
  // }


  constructor(reportDTODate: {
    id: string,
    date: string,
    workDone: {id: string, todoItem: string, time: { unit: string, amount: number }}[],
    planForTomorrow: {id: string, todoItem: string, time: { unit: string, amount: number }}[],
    currentProblems: string[],
    studentComment: string[],
    learnedForToday: string[],
    mentorComment: string[],
    isDayOff: boolean,
  }) {
    this.id = reportDTODate.id;
    this.date = reportDTODate.date;
    this.workDone = reportDTODate.workDone.map((workDoneItem) =>
      new WorkDone(workDoneItem.id, workDoneItem.todoItem,
        new Time(workDoneItem.time.unit, workDoneItem.time.amount)));
    this.planForTomorrow = reportDTODate.planForTomorrow?.map((planForTomorrowItem) =>
      new PlanForTomorrow(planForTomorrowItem.id, planForTomorrowItem.todoItem,
        new Time(planForTomorrowItem.time.unit, planForTomorrowItem.time.amount)));
    this.currentProblems = reportDTODate.currentProblems;
    this.studentComment = reportDTODate.studentComment;
    this.learnedForToday = reportDTODate.learnedForToday;
    this.mentorComment = reportDTODate.mentorComment;
    this.isDayOff = reportDTODate.isDayOff;
  }

}