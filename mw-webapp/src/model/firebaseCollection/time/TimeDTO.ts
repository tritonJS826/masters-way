import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * Time
 */
export class TimeDTO {

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * Number of time units
   */
  public amount: number;

  constructor(timeData: TimeDTO) {
    this.timeUnit = timeData.timeUnit;
    this.amount = timeData.amount;
  }

}

