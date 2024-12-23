import clsx from "clsx";
import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import {convertMinutesToHours} from "src/utils/convertMinutesToHours";
import styles from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem.module.scss";

/**
 * Type of statisticItem's styles
 */
export enum StatisticItemType {

  /**
   * Primary statisticItem
   */
  PRIMARY = "primary",

  /**
   * Secondary statisticItem
   */
  SECONDARY = "secondary"
}

/**
 * StatisticItem
 */
export interface StatisticItem {

  /**
   * StatisticItem value
   */
  value: number;

  /**
   * StatisticItem text
   */
  text: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 *StatisticItem props
 */
interface StatisticItemProps {

  /**
   * StatisticItem
   */
  statisticItem: StatisticItem;

  /**
   * StatisticItem className
   */
  type?: string;

  /**
   * Unit to which minutes will be converted
   */
  convertToHours?: boolean;
}

/**
 * StatisticItem
 */
export const StatisticItem = (props: StatisticItemProps) => {
  const {language} = languageStore;

  /**
   * Get formatted statistic value
   */
  const getFormattedStatisticValue = (): string => {
    if (props.type === StatisticItemType.SECONDARY || props.convertToHours) {
      const convertedMinutes = convertMinutesToHours(props.statisticItem.value);

      return `${convertedMinutes}${LanguageService.way.statisticsBlock.unitOfMeasurement[language]}`;
    }

    return props.statisticItem.value.toString();
  };

  return (
    <div
      className={clsx(styles.statisticItem, styles[props.type ?? StatisticItemType.PRIMARY])}
      data-cy= {props.statisticItem.dataCy}
    >
      <span
        className={styles.statisticValue}
        data-cy={statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}
      >
        {getFormattedStatisticValue()}
      </span>
      <span
        className={styles.statisticText}
        data-cy={statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticText}
      >
        {props.statisticItem.text}
      </span>
    </div>
  );
};
