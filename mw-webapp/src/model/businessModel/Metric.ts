import {makeAutoObservable} from "mobx";

/**
 * Update isDone params
 */
interface UpdateIsDoneParams {

  /**
   * IsDone value
   */
  isDoneToUpdate: boolean;

  /**
   * DoneDate value
   */
  doneDateToUpdate: Date | null;
}

/**
 * Metric's props
 */
interface MetricProps {

  /**
   * Metric's UUID
   */
  uuid: string;

  /**
   * Metrics's description
   */
  description: string;

  /**
   * True if comment was done and false if not
   */
  isDone: boolean;

  /**
   * Time when goal metric was done
   */
  doneDate: Date | null;

  /**
   * Date when metric was created
   */
  createdAt: Date;
}

/**
 * Metrics model
 */
export class Metric {

  /**
   * Metric's UUID
   */
  public uuid: string;

  /**
   * Metrics's description
   */
  public description: string;

  /**
   * True if comment was done and false if not
   */
  public isDone: boolean;

  /**
   * Time when goal metric was done
   */
  public doneDate: Date | null;

  /**
   * Date when metric was created
   */
  public createdAt: Date;

  constructor(goalMetricData: MetricProps) {
    makeAutoObservable(this);
    this.uuid = goalMetricData.uuid;
    this.description = goalMetricData.description;
    this.isDone = goalMetricData.isDone;
    this.doneDate = goalMetricData.doneDate;
    this.createdAt = goalMetricData.createdAt;
  }

  /**
   * Update metric's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Update metric's isDone
   */
  public updateIsDone(params: UpdateIsDoneParams): void {
    this.isDone = params.isDoneToUpdate;
    this.doneDate = params.doneDateToUpdate;
  }

}
