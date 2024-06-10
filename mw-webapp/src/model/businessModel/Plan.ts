import {makeAutoObservable} from "mobx";
import {Label} from "src/model/businessModel/Label";

/**
 * Plan props
 */
interface PlanProps {

  /**
   * Plan's UUID
   */
  uuid: string;

  /**
   * Job that should be done in next period
   */
  description: string;

  /**
   * User's uuid @User.uuid
   */
  ownerUuid: string;

  /**
   * Number of time units (in minutes)
   */
  time: number;

  /**
   * Plan's tags
   */
  tags: Label[];

  /**
   * Is plan was done
   */
  isDone: boolean;

  /**
   * Date when plan was updated in milliseconds
   */
  updatedAt: Date;

  /**
   * Date when plan was created in milliseconds
   */
  createdAt: Date;

  /**
   * Day report uuid
   */
  dayReportUuid: string;

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
 * Plan model
 */
export class Plan {

  /**
   * Plan's UUID
   */
  public uuid: string;

  /**
   * Job that should be done in next period
   */
  public description: string;

  /**
   * User's uuid @User.uuid
   */
  public ownerUuid: string;

  /**
   * How long the job will take time
   */
  public time: number;

  /**
   * Plan's tags
   */
  public tags: Label[];

  /**
   * Is plan was done
   */
  public isDone: boolean;

  /**
   * Date when plan was updated in milliseconds
   */
  public updatedAt: Date;

  /**
   * Date when plan was created in milliseconds
   */
  public createdAt: Date;

  /**
   * DayReport UUID
   */
  public dayReportUuid: string;

  /**
   * Comment's way name
   */
  public wayUuid: string;

  /**
   * Comment's way name
   */
  public wayName: string;

  constructor(planData: PlanProps) {
    makeAutoObservable(this);
    this.uuid = planData.uuid;
    this.description = planData.description;
    this.ownerUuid = planData.ownerUuid;
    this.time = planData.time;
    this.tags = planData.tags.map(tag => new Label(tag));
    this.isDone = planData.isDone;
    this.updatedAt = planData.updatedAt;
    this.createdAt = planData.createdAt;
    this.dayReportUuid = planData.dayReportUuid;
    this.wayName = planData.wayName;
    this.wayUuid = planData.wayUuid;
  }

  /**
   * Update plan's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Update plan's time
   */
  public updateTime(timeToUpdate: number): void {
    this.time = timeToUpdate;
  }

  /**
   * Update plan's isDone
   */
  public updateIsDone(isDoneToUpdate: boolean): void {
    this.isDone = isDoneToUpdate;
  }

  /**
   * Update plan's labels
   */
  public updateLabels(labelsToUpdate: Label[]): void {
    this.tags = labelsToUpdate;
  }

}
