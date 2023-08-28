/**
 * Problem for today
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

  constructor(currentProblemData: CurrentProblem) {
    this.uuid = currentProblemData.uuid;
    this.description = currentProblemData.description;
    this.isDone = currentProblemData.isDone;
  }

}
