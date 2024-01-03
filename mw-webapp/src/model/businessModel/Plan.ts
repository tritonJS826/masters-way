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
  tags: string[];
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
  public tags: string[];

  constructor(planData: PlanProps) {
    this.uuid = planData.uuid;
    this.job = planData.job;
    this.ownerUuid = planData.ownerUuid;
    this.estimationTime = planData.estimationTime;
    this.tags = planData.tags;
  }

  /**
   * Get formatted plan for the next period
   */
  public getPlanForNextPeriod() {
    return `${this.job} (${this.estimationTime})`;
  }

}
