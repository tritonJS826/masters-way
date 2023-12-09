/**
 * PlanForNextPeriod props
 */
interface PlanForNextPeriodProps {

  /**
   * PlanForNextPeriod's UUID
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
   * Number of time units {@link timeUnit}
   */
  estimationTime: number;

  /**
   * Plan's tags
   */
  tags: string[];
}

/**
 * Plan for next period model
 */
export class PlanForNextPeriod {

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

  constructor(planForNextPeriodData: PlanForNextPeriodProps) {
    this.uuid = planForNextPeriodData.uuid;
    this.job = planForNextPeriodData.job;
    this.ownerUuid = planForNextPeriodData.ownerUuid;
    this.estimationTime = planForNextPeriodData.estimationTime;
    this.tags = planForNextPeriodData.tags;
  }

  /**
   * Get formatted plan for the next period
   */
  public getPlanForNextPeriod() {
    return `${this.job} (${this.estimationTime})`;
  }

}
