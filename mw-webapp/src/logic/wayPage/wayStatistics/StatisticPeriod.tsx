import {observer} from "mobx-react-lite";
import {AreaChart} from "src/component/chart/AreaChart";
import {BarChart} from "src/component/chart/blockChart/BarChart";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticBlock, StatisticBlockType} from "src/logic/wayPage/wayStatistics/statisticBlock/StatisticBlock";
import {StatisticItem} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
import {StatisticLabels} from "src/logic/wayPage/wayStatistics/statisticLabels/StatisticLabels";
import {StatisticWidget} from "src/logic/wayPage/wayStatistics/statisticWidget/StatisticWidget";
import {Label} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
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

  /**
   * If isEditable then checkbox near is shown
   */
  isCheckboxShown: boolean;

  /**
   * All labels
   */
  labels: Label[];

}

/**
 * Statistic block for period
 */
export const StatisticPeriod = observer((props: StatisticPeriodProps) => {
  const {language} = languageStore;

  return (
    <VerticalContainer className={styles.statisticContainer}>
      <Title
        level={HeadingLevel.h2}
        text={props.title}
        placeholder=""
      />
      {!!props.totalWayTime &&
      <StatisticWidget
        title={LanguageService.way.statisticsBlock.timeSpentByDay[language]}
        isEditable={props.isCheckboxShown}
      >
        <AreaChart
          datesWithJobTotalTime={props.datesWithJobTotalTime}
          startDate={props.startDate}
          lastDate={props.lastDate}
        />
      </StatisticWidget>
      }
      <StatisticWidget
        title={LanguageService.way.statisticsBlock.overallInformationTitle[language]}
        isEditable={props.isCheckboxShown}
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
        title={LanguageService.way.statisticsBlock.labelsStatisticTitle[language]}
        isEditable={props.isCheckboxShown}
      >
        {!!props.totalWayTime &&
        <BarChart
          itemStats={props.allTagStats}
          labels={props.labels}
          label="Total time"
        />
        }
        <StatisticLabels
          stats={props.allTagStats}
          labels={props.labels}
        />
      </StatisticWidget>
      }

    </VerticalContainer>
  );
});
