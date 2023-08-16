import {Time} from "src/model/deal/time/Time";

/**
 * What was done
 */
export class Work {

  /**
   * Work's ID
   */
  public id: string;

  /**
   * What was done
   */
  public case: string;

  /**
   * How long was the job done
   */
  public time: Time;

  constructor(workDate: Work) {
    this.id = workDate.id;
    this.case = workDate.case;
    this.time = workDate.time;
  }

  /**
   * Get formatted work
   */
  //TODO: uncomment method
  // public getFullWork() {
  //   return `${this.case} (${this.time.getFullTime})`;
  // }

}