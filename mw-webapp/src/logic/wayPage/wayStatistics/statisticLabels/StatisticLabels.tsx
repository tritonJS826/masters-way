import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticLine} from "src/logic/wayPage/wayStatistics/statisticLabels/statisticLine/StatisticLine";
import {LanguageService} from "src/service/LangauageService";
import styles from "src/logic/wayPage/wayStatistics/statisticLabels/StatisticLabels.module.scss";

/**
 * TagStats props
 */
interface TagStatsProps {

  /**
   * Tags stats
   */
  stats: JobTagStat[];
}

/**
 * Render stats related to job tags
 */
export const StatisticLabels = (props: TagStatsProps) => {
  const {language} = useGlobalContext();

  return (
    <>
      <HorizontalGridContainer className={styles.titleLine}>
        <Title
          level={HeadingLevel.h4}
          text={LanguageService.way.statisticsBlock.labelsName[language]}
          className={styles.statisticLabelsTitle}
        />
        <Title
          level={HeadingLevel.h4}
          text={LanguageService.way.statisticsBlock.jobsAmount[language]}
          className={styles.statisticLabelsTitle}
        />
        <Title
          level={HeadingLevel.h4}
          text={LanguageService.way.statisticsBlock.timeMinutes[language]}
          className={styles.statisticLabelsTitle}
        />
      </HorizontalGridContainer>

      {props.stats.map((tagStat) => (
        <VerticalContainer key={tagStat.jobTag.uuid}>
          <StatisticLine
            name={tagStat.jobTag.name}
            color={tagStat.jobTag.color}
            amount={tagStat.totalAmount}
            time={tagStat.totalTime}
            amountPercentage={tagStat.totalAmountPercentage}
            timePercentage={tagStat.totalTimePercentage}
          />
        </VerticalContainer>
      ))
      }
    </>
  );

};
