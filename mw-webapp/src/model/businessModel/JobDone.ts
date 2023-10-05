import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";

/**
 * Job done model
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
   * Unit of time measurement for {@link time}
   */
  public timeUnit: TimeUnit;

  /**
   * How long was the job done
   */
  public time: number;

  constructor(jobDoneData: {
    /**
     * Job's UUID
     */
    uuid: string;
    /**
     * What was done
     */
    description: string;
    /**
     * Unit of time measurement for {@link time}
     */
    timeUnit: TimeUnit;
    /**
     *  How long was the job done
     */
    time: number;
  }) {
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
