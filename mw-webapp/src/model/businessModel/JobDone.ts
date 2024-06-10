import {makeAutoObservable} from "mobx";
import {Label} from "src/model/businessModel/Label";

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
   * Owner's uuid
   */
  ownerUuid: string;

  /**
   * CurrentProblem's tags
   */
  tags: Label[];

  /**
   * JobDone's created date
   */
  createdAt: Date;

  /**
   * JobDone's updated date
   */
  updatedAt: Date;

  /**
   * Comment's way name
   */
  wayUuid: string;

  /**
   * Comment's way name
   */
  wayName: string;
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
   * Owner's uuid
   */
  public ownerUuid: string;

  /**
   * JobDone's tags
   */
  public tags: Label[];

  /**
   * JobDone's created date
   */
  public createdAt: Date;

  /**
   * JobDone's updated date
   */
  public updatedAt: Date;

  /**
   * Comment's way name
   */
  public wayUuid: string;

  /**
   * Comment's way name
   */
  public wayName: string;

  constructor(jobDoneData: JobDoneProps) {
    makeAutoObservable(this);
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.time = jobDoneData.time;
    this.tags = jobDoneData.tags.map(tag => new Label(tag));
    this.ownerUuid = jobDoneData.ownerUuid;
    this.createdAt = jobDoneData.createdAt;
    this.updatedAt = jobDoneData.updatedAt;
    this.wayName = jobDoneData.wayName;
    this.wayUuid = jobDoneData.wayUuid;
  }

  /**
   * Update job's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Update job's time
   */
  public updateTime(timeToUpdate: number): void {
    this.time = timeToUpdate;
  }

  /**
   * Update job's labels
   */
  public updateLabels(labelsToUpdate: Label[]): void {
    this.tags = labelsToUpdate;
  }

}
