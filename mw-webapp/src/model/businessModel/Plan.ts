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
  job: string;

  /**
   * User's uuid @User.uuid
   */
  ownerUuid: string;

  /**
   * Number of time units (in minutes)
   */
  estimationTime: number;

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
  updatedAt: number;

  /**
   * Date when plan was created in milliseconds
   */
  createdAt: number;
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
  public job: string;

  /**
   * User's uuid @User.uuid
   */
  public ownerUuid: string;

  /**
   * How long the job will take time
   */
  public estimationTime: number;

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
  public updatedAt: number;

  /**
   * Date when plan was created in milliseconds
   */
  public createdAt: number;

  constructor(planData: PlanProps) {
    this.uuid = planData.uuid;
    this.job = planData.job;
    this.ownerUuid = planData.ownerUuid;
    this.estimationTime = planData.estimationTime;
    this.tags = planData.tags;
    this.isDone = planData.isDone;
    this.updatedAt = planData.updatedAt;
    this.createdAt = planData.createdAt;
  }

}
