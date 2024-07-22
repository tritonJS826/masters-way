import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import styles from "src/logic/wayPage/wayStatistics/statisticLabels/statisticLine/StatisticLine.module.scss";
import {Tooltip} from "src/component/tooltip/Tooltip";

type StatisticLineProps = {

  /**
   * Label's color
   */
  color: string;

  /**
   * Label's name
   */
  name: string;

  /**
   * Label's amount
   */
  amount: number;

  /**
   * Label's total time
   */
  time: number;

  /**
   * Label's amount percentage
   */
  amountPercentage: number;

  /**
   * Label's total time percentage
   */
  timePercentage: number;

};

/**
 * One line for statistic block
 */
export const StatisticLine = (props: StatisticLineProps) => {
  return (
    <HorizontalGridContainer className={styles.statisticLine}>
      <HorizontalContainer className={styles.labelColorName}>
        <div
          style={{backgroundColor: props.color}}
          className={styles.labelColor}
        />
        <Tooltip content={props.name}>
          <span className={styles.labelName}>
            {props.name}
          </span>
        </Tooltip>
      </HorizontalContainer>
      <HorizontalContainer className={styles.amountTime}>
        {props.amount}
        <span className={styles.percentageBLock}>
          {`(${props.amountPercentage}%)`}
        </span>
      </HorizontalContainer>
      <HorizontalContainer className={styles.amountTime}>
        {props.time}
        <span className={styles.percentageBLock}>
          {`(${props.timePercentage}%)`}
        </span>
      </HorizontalContainer>
    </HorizontalGridContainer>
  );
};

