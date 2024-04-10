import clsx from "clsx";
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
}

/**
 * StatisticItem
 */
export const StatisticItem = (props: StatisticItemProps) => {
  return (
    <div className={clsx(styles.statisticItem, styles[props.type ?? StatisticItemType.PRIMARY])}>
      <span className={styles.statisticValue}>
        {props.statisticItem.value}
      </span>
      <span className={styles.statisticText}>
        {props.statisticItem.text}
      </span>
    </div>
  );
};
