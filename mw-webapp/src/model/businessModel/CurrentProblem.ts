/**
 * Problem for current period model
 */
export class CurrentProblem {

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

  constructor(currentProblemData: CurrentProblem) {
    this.uuid = currentProblemData.uuid;
    this.description = currentProblemData.description;
    this.isDone = currentProblemData.isDone;
    this.ownerUuid = currentProblemData.ownerUuid;
    this.tags = currentProblemData.tags;
  }

}
