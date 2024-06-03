import {makeAutoObservable} from "mobx";
import {JobTag} from "src/model/businessModelPreview/WayPreview";

/**
 * Problem's props
 */
interface ProblemProps {

    /**
     * Problem's UUID
     */
    uuid: string;

    /**
     * Problem's description
     */
    description: string;

    /**
     * True if problem is resolved and false if not resolved
     */
    isDone: boolean;

    /**
     * Owner or mentor's uuid @User.uuid
     */
    ownerUuid: string;

    /**
     * CurrentProblem's tags
     */
    tags: JobTag[];

    /**
     * Created at
     */
    createdAt: Date;

    /**
     * Day report uuid
     */
    dayReportUuid: string;

    /**
     * Owner name
     */
    ownerName: string;

    /**
     * Updated at
     */
    updatedAt: Date;
}

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

  constructor(problemData: ProblemProps) {
    makeAutoObservable(this);
    this.uuid = problemData.uuid;
    this.description = problemData.description;
    this.isDone = problemData.isDone;
    this.ownerUuid = problemData.ownerUuid;
    this.tags = problemData.tags.map(tag => new JobTag(tag));
    this.createdAt = problemData.createdAt;
    this.dayReportUuid = problemData.dayReportUuid;
    this.ownerName = problemData.ownerName;
    this.updatedAt = problemData.updatedAt;
  }

  /**
   * Update problem's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Update problem's isDone
   */
  public updateIsDone(isDoneToUpdate: boolean): void {
    this.isDone = isDoneToUpdate;
  }

}
