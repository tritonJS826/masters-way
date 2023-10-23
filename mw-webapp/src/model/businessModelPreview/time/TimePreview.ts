import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * Time Preview model
 */
export class TimePreview {

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * Number of time units
   */
  public amount: number;

  constructor(timeData: TimePreview) {
    this.timeUnit = timeData.timeUnit;
    this.amount = timeData.amount;
  }

}

