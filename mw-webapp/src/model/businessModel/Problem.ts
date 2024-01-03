/**
 * Problem for current period model
 */
export class Problem {

  /**
   * Problem's UUID
   */
  public uuid: string;

  /**
   * Problem's description
   */
  public description: string;

  /**
   * True if problem is resolved and false if not resolved
   */
  public isDone: boolean;

  /**
   * Owner or mentor's uuid @User.uuid
   */
  public ownerUuid: string;

  /**
   * CurrentProblem's tags
   */
  public tags: string[];

  constructor(problemData: Problem) {
    this.uuid = problemData.uuid;
    this.description = problemData.description;
    this.isDone = problemData.isDone;
    this.ownerUuid = problemData.ownerUuid;
    this.tags = problemData.tags;
  }

}
