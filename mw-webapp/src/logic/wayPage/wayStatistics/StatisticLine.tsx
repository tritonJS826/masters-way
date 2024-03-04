import styles from "src/logic/wayPage/wayStatistics/WayStatistic.module.scss";

type StatisticLineProps = {

  /**
   * Line description (left part)
   */
  description: string | React.ReactNode;

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
    <div className={styles.alignContent}>
      <div>
        {params.description}
      </div>
      {params.value}
    </div>
  );
};
