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
 * Default way stringified
 */
export const DEFAULT_WAY_STRINGIFIED = JSON.stringify(DEFAULT_WAY);

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

    localStorageWorker.setItemByKey("way", JSON.stringify(wayStorageData));
  }

  /**
   * Load goalMetricsVisibility
   */
  public static loadGoalMetricsVisibility() {
    const wayStorageDataStringified = localStorageWorker.getItemByKey("way") ?? DEFAULT_WAY_STRINGIFIED;
    const wayStorageDataParsed: WayStorageData = JSON.parse(wayStorageDataStringified);
    const goalMetricsVisibility = wayStorageDataParsed.goalMetricsVisibility;
    this.setGoalMetricsVisibility(goalMetricsVisibility ?? DEFAULT_WAY.goalMetricsVisibility);
  }

  /**
   * Get current goalMetricsVisibility
   */
  public static getCurrentGoalMetricsVisibility() {
    const wayStorageDataStringified = localStorageWorker.getItemByKey("way") ?? DEFAULT_WAY_STRINGIFIED;
    const wayStorageDataParsed: WayStorageData = JSON.parse(wayStorageDataStringified);
    const goalMetricsVisibility = wayStorageDataParsed.goalMetricsVisibility;

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

    localStorageWorker.setItemByKey("way", JSON.stringify(wayStorageData));
  }

  /**
   * Load statisticVisibility
   */
  public static loadStatisticsVisibility() {
    const wayStorageDataStringified = localStorageWorker.getItemByKey("way") ?? DEFAULT_WAY_STRINGIFIED;
    const wayStorageDataParsed: WayStorageData = JSON.parse(wayStorageDataStringified);
    const statisticVisibility = wayStorageDataParsed.statisticsVisibility;
    this.setGoalMetricsVisibility(statisticVisibility ?? DEFAULT_WAY.statisticsVisibility);
  }

  /**
   * Get current statisticVisibility
   */
  public static getCurrentStatisticsVisibility() {
    const wayStorageDataStringified = localStorageWorker.getItemByKey("way") ?? DEFAULT_WAY_STRINGIFIED;
    const wayStorageDataParsed: WayStorageData = JSON.parse(wayStorageDataStringified);
    const statisticVisibility = wayStorageDataParsed.statisticsVisibility;

    return statisticVisibility;
  }

}
