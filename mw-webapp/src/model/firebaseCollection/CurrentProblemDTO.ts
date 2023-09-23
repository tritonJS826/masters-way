/**
 * Problem for today
 */
export class CurrentProblemDTO {

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

  constructor(currentProblemData: CurrentProblemDTO) {
    this.uuid = currentProblemData.uuid;
    this.description = currentProblemData.description;
    this.isDone = currentProblemData.isDone;
  }

}
