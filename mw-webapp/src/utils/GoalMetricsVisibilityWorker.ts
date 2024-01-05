import {localStorageWorker} from "src/utils/LocalStorage";

/**
 * Available goal metrics
 */
export enum GoalMetricsVisibility {
  TRUE = "true",
  FALSE = "false"
}

/**
 * Default goalMetrics block is opened
 */
export const DEFAULT_GOAL_METRICS_VISIBILITY = GoalMetricsVisibility.TRUE;

/**
 * All statisticsVisibility-related methods
 */
export class GoalMetricsWorker {

  /**
   * Set goalMetricsVisibility
   */
  public static setGoalMetricsVisibility(goalMetricsVisibility: GoalMetricsVisibility) {
    localStorageWorker.setItemByKey("goalMetricsVisibility", goalMetricsVisibility);
  }

  /**
   * Load goalMetricsVisibility
   */
  public static loadGoalMetricsVisibility() {
    const goalMetricsVisibility = localStorageWorker.getItemByKey<GoalMetricsVisibility>("goalMetricsVisibility");

    this.setGoalMetricsVisibility(goalMetricsVisibility ?? DEFAULT_GOAL_METRICS_VISIBILITY);
  }

  /**
   * Get current goalMetricsVisibility
   */
  public static getCurrentGoalMetricsVisibility() {
    return localStorageWorker.getItemByKey<GoalMetricsVisibility>("goalMetricsVisibility") ?? DEFAULT_GOAL_METRICS_VISIBILITY;
  }

}
