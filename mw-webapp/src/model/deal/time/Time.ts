// import {Unit} from "src/model/deal/time/unit/Unit";

/**
 * What was done
 */
export class Time {

  /**
   * Unit of time measurement
   */
  //TODO: add Unit model
  public unit: string;

  /**
   * Number of time units (minutes) spent doing the task
   */
  public amount: number;

  constructor(timeDate: Time) {
    this.unit = timeDate.unit;
    this.amount = timeDate.amount;
  }

  /**
   * Get formatted time
   */
  //TODO: uncomment method
  // public getFullTime() {
  //   return `${this.amount} ${this.unit}`;
  // }

}