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
   * How long did the job take to complete
   */
  public time: number;

  constructor(jobDoneData: JobDone) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.timeUnit = jobDoneData.timeUnit;
    this.time = jobDoneData.time;
  }

}
