import {Label} from "src/model/businessModel/Label";

/**
 * Specific tag related stats
 */
export type JobTagStat = {

  /**
   * Total amount of specific job tags in a way
   */
  totalAmount: number;

  /**
   * Total amount of specific job tags in a way in percent
   */
  totalAmountPercentage: number;

  /**
   * Total time spent on jobs with current job tag
   */
  totalTime: number;

  /**
   * Total time spent on jobs with current tag in percent
   */
  totalTimePercentage: number;

  /**
   * Tag data
   */
  jobTag: Label;
};
