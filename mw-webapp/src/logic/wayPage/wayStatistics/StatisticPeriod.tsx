import {AreaChart} from "src/component/chart/AreaChart";
import {BarChart} from "src/component/chart/blockChart/BarChart";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticBlock, StatisticBlockType} from "src/logic/wayPage/wayStatistics/statisticBlock/StatisticBlock";
import {StatisticItem} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
import {StatisticLabels} from "src/logic/wayPage/wayStatistics/statisticLabels/StatisticLabels";
import {StatisticWidget} from "src/logic/wayPage/wayStatistics/statisticWidget/StatisticWidget";
import styles from "src/logic/wayPage/wayStatistics/StatisticPeriod.module.scss";

/**
 * StatisticPeriod props
 */
interface StatisticPeriodProps {

  /**
   * Title for current statisticBlock
   */
  title: string;

  /**
   * Total way time
   */
  totalWayTime: number;

  /**
   * Start date of period
   */
  startDate: Date;

  /**
   * Last date of period
   */
  lastDate: Date;

  /**
   * Dated with job total time
   */
  datesWithJobTotalTime: Map<string, number>;

  /**
   * Total statistic items primary
   */
  totalStatisticItemsPrimary?: StatisticItem[];

  /**
   * Total statistic items secondary
   */
  totalStatisticItemsSecondary?: StatisticItem[];

  /**
   * Akk tags
   */
  allTagStats: JobTagStat[];

}

/**
 * Statistic block for period
 */
export const StatisticPeriod = (props: StatisticPeriodProps) => {
  return (
    <VerticalContainer className={styles.statisticContainer}>
      <Title
        level={HeadingLevel.h2}
        text={props.title}
      />
      {!!props.totalWayTime &&
      <StatisticWidget
        title="Metrics"
        isEditable={true}
      >
        <AreaChart
          datesWithJobTotalTime={props.datesWithJobTotalTime}
          startDate={props.startDate}
          lastDate={props.lastDate}
        />
      </StatisticWidget>
      }
      <StatisticWidget
        title="Overall information"
        isEditable={true}
      >
        {props.totalStatisticItemsPrimary &&
        <StatisticBlock
          statisticItems={props.totalStatisticItemsPrimary}
          type={StatisticBlockType.PRIMARY}
        />
        }
        {props.totalStatisticItemsSecondary &&
        <StatisticBlock
          statisticItems={props.totalStatisticItemsSecondary}
          type={StatisticBlockType.SECONDARY}
        />
        }
      </StatisticWidget>

      {props.allTagStats.length !== 0 &&
      <StatisticWidget
        title="Labels statistic"
        isEditable={true}
      >
        {!!props.totalWayTime &&
        <BarChart
          itemStats={props.allTagStats.map(tagStat => ({
            name: tagStat.jobTag.name,
            value: tagStat.totalTime,
            color: tagStat.jobTag.color,
          }))}
          label="Total time"
        />
        }
        <StatisticLabels stats={props.allTagStats} />
      </StatisticWidget>
      }

    </VerticalContainer>
  );
};
