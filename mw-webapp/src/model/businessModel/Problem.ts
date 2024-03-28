import {JobTag} from "src/model/businessModelPreview/WayPreview";

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
  public tags: JobTag[];

  /**
   * Created at
   */
  public createdAt: Date;

  /**
   * Day report uuid
   */
  public dayReportUuid: string;

  /**
   * Owner name
   */
  public ownerName: string;

  /**
   * Updated at
   */
  public updatedAt: Date;

  constructor(problemData: Problem) {
    this.uuid = problemData.uuid;
    this.description = problemData.description;
    this.isDone = problemData.isDone;
    this.ownerUuid = problemData.ownerUuid;
    this.tags = problemData.tags;
    this.createdAt = problemData.createdAt;
    this.dayReportUuid = problemData.dayReportUuid;
    this.ownerName = problemData.ownerName;
    this.updatedAt = problemData.updatedAt;
  }

}
