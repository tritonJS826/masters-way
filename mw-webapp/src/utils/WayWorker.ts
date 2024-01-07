import {localStorageWorker} from "src/utils/LocalStorage";

/**
 * Default goalMetrics block is opened
 */
export const DEFAULT_GOAL_METRICS_VISIBILITY = true;

/**
 * Default statistics block is opened
 */
export const DEFAULT_STATISTICS = true;

/**
 * All way-related methods
 */
export class WayWorker {

  /**
   * Set goalMetricsVisibility
   */
  public static setGoalMetricsVisibility(goalMetricsVisibility: boolean) {
    localStorageWorker.setItemByKey("goalMetricsVisibility", goalMetricsVisibility);
  }

  /**
   * Load goalMetricsVisibility
   */
  public static loadGoalMetricsVisibility() {
    const goalMetricsVisibility = localStorageWorker.getItemByKey<boolean>("goalMetricsVisibility");

    this.setGoalMetricsVisibility(goalMetricsVisibility ?? DEFAULT_GOAL_METRICS_VISIBILITY);
  }

  /**
   * Get current goalMetricsVisibility
   */
  public static getCurrentGoalMetricsVisibility() {
    return localStorageWorker.getItemByKey<boolean>("goalMetricsVisibility") ?? DEFAULT_GOAL_METRICS_VISIBILITY;
  }

  /**
   * Set statisticVisibility
   */
  public static setStatisticsVisibility(statisticsVisibility: boolean) {
    localStorageWorker.setItemByKey("statisticsVisibility", statisticsVisibility);
  }

  /**
   * Load statisticVisibility
   */
  public static loadStatisticsVisibility() {
    const statisticVisibility = localStorageWorker.getItemByKey<boolean>("statisticsVisibility");

    this.setStatisticsVisibility(statisticVisibility ?? DEFAULT_STATISTICS);
  }

  /**
   * Get current statisticVisibility
   */
  public static getCurrentStatisticsVisibility() {
    return localStorageWorker.getItemByKey<boolean>("statisticsVisibility") ?? DEFAULT_STATISTICS;
  }

}
