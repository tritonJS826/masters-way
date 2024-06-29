import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {StatisticItem, StatisticItemType} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
import styles from "src/logic/wayPage/wayStatistics/statisticBlock/StatisticBlock.module.scss";

/**
 * Type of statisticBlock's styles
 */
export enum StatisticBlockType {

  /**
   * Primary statisticItem
   */
  PRIMARY = "primary",

  /**
   * Secondary statisticItem
   */
  SECONDARY = "secondary",
}

/**
 * StatisticBlock props
 */
interface StatisticBlockProps {

  /**
   * Statistic items
   */
  statisticItems: StatisticItem[];

  /**
   * Type of statisticItem styles
   * @default {@link StatisticBlockType.PRIMARY}
   */
  type?: StatisticBlockType;

}

/**
 * StatisticBlock component
 */
export const StatisticBlock = (props: StatisticBlockProps) => {
  return (
    <HorizontalGridContainer className={styles.statistics}>
      {props.statisticItems.map((statisticItem, index) => {
        return (
          <StatisticItem
            key={statisticItem.text}
            statisticItem={statisticItem}
            type={props.type ?? StatisticItemType.PRIMARY}
            convertToHours={index === 0}
          />
        );
      })}
    </HorizontalGridContainer>
  );
};
