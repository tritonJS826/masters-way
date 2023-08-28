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

  constructor(goalData: JobDone) {
    this.uuid = goalData.uuid;
    this.description = goalData.description;
    this.timeUnit = goalData.timeUnit;
    this.time = goalData.time;
  }

}
