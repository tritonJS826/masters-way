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

  constructor(uuid: string, description: string, time: Time) {
    this.uuid = uuid;
    this.description = description;
    this.time = new Time(time.unit, time.amount);
  }

  /**
   * Get formatted job that was done
   */
  public getFullJobDone() {
    return `${this.description} (${this.time.amount} ${this.time.unit})`;
  }

}
