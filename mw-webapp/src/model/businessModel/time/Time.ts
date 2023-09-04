import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * What was done
 */
export class Time {

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * Number of time units (minutes) spent doing the task
   */
  public amount: number;

  constructor(timeData: Time) {
    this.timeUnit = timeData.timeUnit;
    this.amount = timeData.amount;
  }

  /**
   * Get formatted time
   */
  public getFullTime() {
    return `${this.amount} ${this.timeUnit}`;
  }

}

