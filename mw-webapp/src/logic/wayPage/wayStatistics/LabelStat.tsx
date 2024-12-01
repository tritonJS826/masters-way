import {makeAutoObservable} from "mobx";
import {Label, LabelProps} from "src/model/businessModel/Label";

/**
 * LabelStat constructor params
 */
export type LabelStatParams = {

  /**
   * Total amount of specific job tags in a way
   */
  jobsAmount: number;

  /**
   * Total amount of specific job tags in a way in percent
   */
  jobsAmountPercentage: number;

  /**
   * Total time spent on jobs with current job tag
   */
  time: number;

  /**
   * Total time spent on jobs with current tag in percent
   */
  timePercentage: number;

  /**
   * Label data
   */
  label: LabelProps;
}

/**
 * Specific tag related stats
 */
export class LabelStat {

  /**
   * Total amount of specific job tags in a way
   */
  public jobsAmount: number;

  /**
   * Total amount of specific job tags in a way in percent
   */
  public jobsAmountPercentage: number;

  /**
   * Total time spent on jobs with current job tag
   */
  public time: number;

  /**
   * Total time spent on jobs with current tag in percent
   */
  public timePercentage: number;

  /**
   * Label data
   */
  public label: Label;

  constructor(labelStatData: LabelStatParams) {
    makeAutoObservable(this);
    this.jobsAmount = labelStatData.jobsAmount;
    this.jobsAmountPercentage = labelStatData.jobsAmountPercentage;
    this.time = labelStatData.time;
    this.timePercentage = labelStatData.timePercentage;
    this.label = new Label(labelStatData.label);
  }

}
