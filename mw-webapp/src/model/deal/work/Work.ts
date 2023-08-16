import {Time} from "src/model/deal/time/Time";

/**
 * What was done
 */
export class Work {

  /**
   * Work's ID
   */
  private id: string;

  /**
   * What was done
   */
  private case: string;

  /**
   * How long was the job done
   */
  private time: Time;

  constructor(workDate: Work) {
    this.id = workDate.id;
    this.case = workDate.case;
    this.time = workDate.time;
  }

  /**
   * Get formatted work
   */
  public getFullWork() {
    return `${this.case} (${this.time.getFullTime})`;
  }

}