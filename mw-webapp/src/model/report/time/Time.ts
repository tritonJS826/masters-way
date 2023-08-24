// import {Unit} from "src/model/report/time/unit/Unit";

/**
 * What was done
 */
export class Time {

  /**
   * Unit of time measurement
   */
  public unit: string;

  /**
   * Number of time units (minutes) spent doing the task
   */
  public amount: number;

  constructor(unit: string, amount: number) {
    this.unit = unit;
    this.amount = amount;
  }

  /**
   * Get formatted time
   */
  public getFullTime() {
    return `${this.amount} ${this.unit}`;
  }

}