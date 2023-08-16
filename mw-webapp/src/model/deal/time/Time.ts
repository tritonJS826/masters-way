import {Unit} from "src/model/deal/time/unit/Unit";

/**
 * What was done
 */
export class Time {

  /**
   * Unit of time measurement
   */
  private unit: Unit;

  /**
   * Number of time units (minutes) spent doing the task
   */
  private amount: number;

  constructor(timeDate: Time) {
    this.unit = timeDate.unit;
    this.amount = timeDate.amount;
  }

  /**
   * Get formatted time
   */
  public getFullTime() {
    return `${this.amount} ${this.unit}`;
  }

}