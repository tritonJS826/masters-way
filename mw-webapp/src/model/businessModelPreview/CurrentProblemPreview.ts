/**
 * Problem for current period
 */
export class CurrentProblemPreview {

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

  constructor(currentProblemData: CurrentProblemPreview) {
    this.uuid = currentProblemData.uuid;
    this.description = currentProblemData.description;
    this.isDone = currentProblemData.isDone;
  }

}
