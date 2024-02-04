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

  /**
   * Line component (right part)
   */
  component?: React.ReactNode;
};

/**
 * One line for statistic block
 */
export const StatisticLine = (params: StatisticLineProps) => {
  return (
    <p className={styles.alignContent}>
      <span>
        {params.component || params.description}
      </span>
      {params.value}
    </p>
  );
};
