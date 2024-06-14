import {makeAutoObservable} from "mobx";
import {Label} from "src/model/businessModel/Label";

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
    tags: Label[];

    /**
     * Created at
     */
    createdAt: Date;

    /**
     * Day report uuid
     */
    dayReportUuid: string;

    /**
     * Updated at
     */
  updatedAt: Date;

    /**
     * Comment's way name
     */
    wayUuid: string;

    /**
     * Comment's way name
     */
    wayName: string;

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
  public tags: Label[];

  /**
   * Created at
   */
  public createdAt: Date;

  /**
   * Day report uuid
   */
  public dayReportUuid: string;

  /**
   * Updated at
   */
  public updatedAt: Date;

  /**
   * Comment's way name
   */
  public wayUuid: string;

  /**
   * Comment's way name
   */
  public wayName: string;

  constructor(problemData: ProblemProps) {
    makeAutoObservable(this);
    this.uuid = problemData.uuid;
    this.description = problemData.description;
    this.isDone = problemData.isDone;
    this.ownerUuid = problemData.ownerUuid;
    this.tags = problemData.tags.map(tag => new Label(tag));
    this.createdAt = problemData.createdAt;
    this.dayReportUuid = problemData.dayReportUuid;
    this.updatedAt = problemData.updatedAt;
    this.wayName = problemData.wayName;
    this.wayUuid = problemData.wayUuid;
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
