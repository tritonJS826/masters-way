import styles from "src/logic/wayPage/wayStatistics/WayStatistic.module.scss";

type StatisticLineProps = {

  /**
   * Line description (left part)
   */
  description: string;

  /**
   * Line value (right part)
   */
  value: number | string;
};

/**
 * One line for statistic block
 */
export const StatisticLine = (params: StatisticLineProps) => {
  return (
    <p className={styles.alignContent}>
      <span>
        {params.description}
      </span>
      {params.value}
    </p>
  );
};
