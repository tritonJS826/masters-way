import {localStorageWorker} from "src/utils/LocalStorage";

/**
 * Available languages
 */
export enum StatisticsVisibility {
  TRUE = "true",
  FALSE = "false"
}

/**
 * Default statistics block is opened
 */
export const DEFAULT_STATISTICS = StatisticsVisibility.TRUE;

/**
 * All statisticsVisibility-related methods
 */
export class StatisticsWorker {

  /**
   * Set statisticVisibility
   */
  public static setStatisticsVisibility(statisticsVisibility: StatisticsVisibility) {
    localStorageWorker.setItemByKey("statisticsVisibility", statisticsVisibility);
  }

  /**
   * Load statisticVisibility
   */
  public static loadStatisticsVisibility() {
    const statisticVisibility = localStorageWorker.getItemByKey<StatisticsVisibility>("statisticsVisibility");

    this.setStatisticsVisibility(statisticVisibility ?? DEFAULT_STATISTICS);
  }

  /**
   * Get current statisticVisibility
   */
  public static getCurrentStatisticsVisibility() {
    return localStorageWorker.getItemByKey<StatisticsVisibility>("statisticsVisibility") ?? DEFAULT_STATISTICS;
  }

}
