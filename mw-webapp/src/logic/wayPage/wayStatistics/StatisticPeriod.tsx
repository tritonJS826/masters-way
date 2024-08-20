import {observer} from "mobx-react-lite";
import {AreaChart} from "src/component/chart/AreaChart";
import {BarChart} from "src/component/chart/blockChart/BarChart";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {StatisticBlock, StatisticBlockType} from "src/logic/wayPage/wayStatistics/statisticBlock/StatisticBlock";
import {StatisticItem} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
import {StatisticLabels} from "src/logic/wayPage/wayStatistics/statisticLabels/StatisticLabels";
import {StatisticWidget} from "src/logic/wayPage/wayStatistics/statisticWidget/StatisticWidget";
import {WayStatistics} from "src/model/businessModel/WayStatistics";
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
   * Total statistic items primary
   */
  totalStatisticItemsPrimary: StatisticItem[];

  /**
   * Total statistic items secondary
   */
  totalStatisticItemsSecondary: StatisticItem[];

  /**
   * If isEditable then checkbox near is shown
   */
  isCheckboxShown: boolean;

  /**
   * Way statistics
   */
  wayStatistics: WayStatistics;

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
      <StatisticWidget
        title={LanguageService.way.statisticsBlock.timeSpentByDay[language]}
        isEditable={props.isCheckboxShown}
      >
        <AreaChart points={props.wayStatistics.timeSpentByDayChart.map((point) => ({
          date: point.date,
          value: point.value,
        }))}
        />
      </StatisticWidget>
      <StatisticWidget
        title={LanguageService.way.statisticsBlock.overAllInformation.overallInformationTitle[language]}
        isEditable={props.isCheckboxShown}
      >
        <StatisticBlock
          statisticItems={props.totalStatisticItemsPrimary}
          type={StatisticBlockType.PRIMARY}
        />
        <StatisticBlock
          statisticItems={props.totalStatisticItemsSecondary}
          type={StatisticBlockType.SECONDARY}
        />
      </StatisticWidget>

      <StatisticWidget
        title={LanguageService.way.statisticsBlock.labelsStatisticTitle[language]}
        isEditable={props.isCheckboxShown}
      >
        <BarChart
          itemStats={props.wayStatistics.labelStatistics.labels}
          title="Total time"
        />
        <StatisticLabels
          stats={props.wayStatistics.labelStatistics.labels}
          labels={props.wayStatistics.labelStatistics.labels.map(stat => stat.label)}
        />
      </StatisticWidget>

    </VerticalContainer>
  );
});
