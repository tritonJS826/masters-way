// import {Time} from "src/model/businessModel/time/Time";

/**
 * Job that was done
 */
export class JobDone {

  /**
   * Job's UUID
   */
  public uuid: string;

  /**
   * What was done
   */
  public description: string;

  /**
   * Enum @Time.unit (minute, hour, day, etc.)
   */
  public timeUnit: string;

  /**
    * How long did the task take to complete
    */
  public time: number;

  constructor(jobDone: JobDone) {
    this.uuid = jobDone.uuid;
    this.description = jobDone.description;
    this.timeUnit = jobDone.timeUnit;
    this.time = jobDone.time;
  }

  /**
   * Get formatted job that was done
   */
  public getFullJobDone() {
    return `${this.description} (${this.time} ${this.timeUnit})`;
  }

}
