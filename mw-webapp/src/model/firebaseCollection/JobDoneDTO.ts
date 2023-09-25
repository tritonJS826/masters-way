import {TimeUnit} from "src/model/firebaseCollection/time/timeUnit/TimeUnit";

/**
 * Job that was done
 */
export class JobDoneDTO {

  /**
   * Job's UUID
   */
  public uuid: string;

  /**
   * What was done
   */
  public description: string;

  /**
   * Unit of time measurement
   */
  public timeUnit: TimeUnit;

  /**
   * How long did the task take to complete
   */
  public time: number;

  constructor(jobDoneData: JobDoneDTO) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.timeUnit = jobDoneData.timeUnit;
    this.time = jobDoneData.time;
  }

}
