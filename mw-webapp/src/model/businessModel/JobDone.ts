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
   * CurrentProblem's tags
   */
  tags: string[];
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
   * JobDone's tags
   */
  public tags: string[];

  constructor(jobDoneData: JobDoneProps) {
    this.uuid = jobDoneData.uuid;
    this.description = jobDoneData.description;
    this.time = jobDoneData.time;
    this.tags = jobDoneData.tags;
  }

}
