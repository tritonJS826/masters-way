import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

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
  public timeUnit: TimeUnit;

  /**
    * How long did the job take to complete
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
  public getJobDone() {
    return `${this.description} (${this.time} ${this.timeUnit})`;
  }

}
