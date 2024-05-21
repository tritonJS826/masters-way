import {JobTag} from "src/model/businessModelPreview/WayPreview";

/**
 * JobDone props
 */
interface JobDoneProps {

  /**
   * JobDone's UUID
   */
  uuid: string;

  /**
   * What was done
   */
  description: string;

  /**
   * Number of time units
   */
  time: number;

  /**
   * Owner's name
   */
  ownerName: string;

  /**
   * Owner's uuid
   */
  ownerUuid: string;

  /**
   * CurrentProblem's tags
   */
  tags: JobTag[];

  /**
   * JobDone's created date
   */
  createdAt: Date;

  /**
   * JobDone's updated date
   */
  updatedAt: Date;
}

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
   * How long was the job done
   */
  public time: number;

  /**
   * Owner's name
   */
  public ownerName: string;

  /**
   * Owner's uuid
   */
  public ownerUuid: string;

  /**
   * JobDone's tags
   */
  public tags: JobTag[];

  /**
   * JobDone's creted date
   */
  public createdAt: Date;

  /**
   * JobDone's updated date
   */
  public updatedAt: Date;

  constructor(jobDoneData: JobDoneProps) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.time = jobDoneData.time;
    this.tags = jobDoneData.tags;
    this.ownerName = jobDoneData.ownerName;
    this.ownerUuid = jobDoneData.ownerUuid;
    this.createdAt = jobDoneData.createdAt;
    this.updatedAt = jobDoneData.updatedAt;
  }

}
