import {TimeUnit} from "src/model/DTOModel/time/timeUnit/TimeUnit";

/**
 * Job done DTO model
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
   * Unit of time measurement for {@link time}
   */
  public timeUnit: TimeUnit;

  /**
   * Number of time units {@link timeUnit}
   */
  public time: number;

  constructor(jobDoneData: JobDoneDTO) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.timeUnit = jobDoneData.timeUnit;
    this.time = jobDoneData.time;
  }

}
