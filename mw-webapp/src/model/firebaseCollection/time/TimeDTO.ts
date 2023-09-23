import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * How long was the job done
 */
export class TimeDTO {

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * Number of time units spent doing the job
   */
  public amount: number;

  constructor(timeData: TimeDTO) {
    this.timeUnit = timeData.timeUnit;
    this.amount = timeData.amount;
  }

}

