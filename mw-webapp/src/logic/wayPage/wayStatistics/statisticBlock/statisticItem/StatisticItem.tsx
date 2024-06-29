import clsx from "clsx";
import {MINUTES_IN_HOUR} from "src/utils/DateUtils";
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
  return (
    <div className={clsx(styles.statisticItem, styles[props.type ?? StatisticItemType.PRIMARY])}>
      <span className={styles.statisticValue}>
        {props.convertToHours
          ? `${Math.round(props.statisticItem.value / MINUTES_IN_HOUR)}h`
          : props.statisticItem.value
        }
      </span>
      <span className={styles.statisticText}>
        {props.statisticItem.text}
      </span>
    </div>
  );
};
