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
   * Enum @Time.unit
   */
  public timeUnit: TimeUnit;

  /**
   * How long was the job done
   */
  public time: number;

  constructor(jobDoneData: JobDone) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.timeUnit = jobDoneData.timeUnit;
    this.time = jobDoneData.time;
  }

  /**
   * Get formatted job that was done
   */
  public getJobDone() {
    return `${this.description} (${this.time} ${this.timeUnit})`;
  }

}
