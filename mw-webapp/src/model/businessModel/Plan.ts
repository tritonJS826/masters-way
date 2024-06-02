import {JobTag} from "src/model/businessModelPreview/WayPreview";

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
  tags: JobTag[];

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
   * Owner name
   */
  ownerName: string;

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
  public tags: JobTag[];

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
   * Plan's owner name
   */
  public ownerName: string;

  constructor(planData: PlanProps) {
    this.uuid = planData.uuid;
    this.description = planData.description;
    this.ownerUuid = planData.ownerUuid;
    this.time = planData.time;
    this.tags = planData.tags;
    this.isDone = planData.isDone;
    this.updatedAt = planData.updatedAt;
    this.createdAt = planData.createdAt;
    this.dayReportUuid = planData.dayReportUuid;
    this.ownerName = planData.ownerName;
  }

}
