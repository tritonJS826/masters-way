import {Time} from "src/model/businessModel/time/Time";

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
   * How long was the job done
   */
  public time: Time;

  constructor(jobDoneData: JobDone) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.time = new Time(jobDoneData.time.unit, jobDoneData.time.amount);
  }

  /**
   * Get formatted job that was done
   */
  public getFullJobDone() {
    return `${this.description} (${this.time.amount} ${this.time.unit})`;
  }

}
