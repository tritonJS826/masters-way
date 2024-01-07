import {localStorageWorker} from "src/utils/LocalStorage";

export type WayStorageData = {

  /**
   * Supported statistics visibility
   */
  statisticsVisibility: boolean;

  /**
   * Supported goal metrics visibility
   */
  goalMetricsVisibility: boolean;
}

const DEFAULT_WAY = {

  /**
   * Default goalMetrics block is opened
   */
  statisticsVisibility: true,

  /**
   * Default statistics block is opened
   */
  goalMetricsVisibility: true,
};

/**
 * All way-related methods
 */
export class WayWorker {

  /**
   * Set goalMetricsVisibility
   */
  public static setGoalMetricsVisibility(goalMetricsVisibility: boolean) {
    const statisticsVisibility = WayWorker.getCurrentStatisticsVisibility();
    const wayStorageData = {
      statisticsVisibility,
      goalMetricsVisibility,
    };

    localStorageWorker.setItemByKey("way", wayStorageData);
  }

  /**
   * Load goalMetricsVisibility
   */
  public static loadGoalMetricsVisibility() {
    const wayStorageData = localStorageWorker.getItemByKey<WayStorageData>("way") ?? DEFAULT_WAY;
    const goalMetricsVisibility = wayStorageData.goalMetricsVisibility;
    this.setGoalMetricsVisibility(goalMetricsVisibility ?? DEFAULT_WAY.goalMetricsVisibility);
  }

  /**
   * Get current goalMetricsVisibility
   */
  public static getCurrentGoalMetricsVisibility() {
    const wayStorageData = localStorageWorker.getItemByKey<WayStorageData>("way") ?? DEFAULT_WAY;
    const goalMetricsVisibility = wayStorageData.goalMetricsVisibility;

    return goalMetricsVisibility;
  }

  /**
   * Set statisticVisibility
   */
  public static setStatisticsVisibility(statisticsVisibility: boolean) {
    const goalMetricsVisibility = WayWorker.getCurrentGoalMetricsVisibility();
    const wayStorageData = {
      statisticsVisibility,
      goalMetricsVisibility,
    };

    localStorageWorker.setItemByKey("way", wayStorageData);
  }

  /**
   * Load statisticVisibility
   */
  public static loadStatisticsVisibility() {
    const wayStorageData = localStorageWorker.getItemByKey<WayStorageData>("way") ?? DEFAULT_WAY;
    const statisticVisibility = wayStorageData.statisticsVisibility;
    this.setGoalMetricsVisibility(statisticVisibility ?? DEFAULT_WAY.statisticsVisibility);
  }

  /**
   * Get current statisticVisibility
   */
  public static getCurrentStatisticsVisibility() {
    const wayStorageData = localStorageWorker.getItemByKey<WayStorageData>("way") ?? DEFAULT_WAY;
    const statisticVisibility = wayStorageData.statisticsVisibility;

    return statisticVisibility;
  }

}
