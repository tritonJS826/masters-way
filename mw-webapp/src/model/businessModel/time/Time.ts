import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * Time model
 */
export class Time {

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * Number of time units
   */
  public amount: number;

  constructor(timeData: Time) {
    this.timeUnit = timeData.timeUnit;
    this.amount = timeData.amount;
  }

  /**
   * Get formatted time
   */
  public getTime() {
    return `${this.amount} ${this.timeUnit}`;
  }

}

