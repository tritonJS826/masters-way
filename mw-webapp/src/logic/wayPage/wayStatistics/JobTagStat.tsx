import {makeAutoObservable} from "mobx";
import {Label} from "src/model/businessModel/Label";

/**
 * Specific tag related stats
 */
export class JobTagStat {

  /**
   * Total amount of specific job tags in a way
   */
  public totalAmount: number;

  /**
   * Total amount of specific job tags in a way in percent
   */
  public totalAmountPercentage: number;

  /**
   * Total time spent on jobs with current job tag
   */
  public totalTime: number;

  /**
   * Total time spent on jobs with current tag in percent
   */
  public totalTimePercentage: number;

  /**
   * Tag data
   */
  public jobTag: Label;

  constructor(jobTagStatData: JobTagStat) {
    makeAutoObservable(this);
    this.totalAmount = jobTagStatData.totalAmount;
    this.totalAmountPercentage = jobTagStatData.totalAmountPercentage;
    this.totalTime = jobTagStatData.totalTime;
    this.totalTimePercentage = jobTagStatData.totalTimePercentage;
    this.jobTag = jobTagStatData.jobTag;
  }

}
