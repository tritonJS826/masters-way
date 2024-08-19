import {observer} from "mobx-react-lite";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Separator} from "src/component/separator/Separator";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LabelStat} from "src/logic/wayPage/wayStatistics/LabelStat";
import {StatisticLine} from "src/logic/wayPage/wayStatistics/statisticLabels/statisticLine/StatisticLine";
import {Label} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/wayStatistics/statisticLabels/StatisticLabels.module.scss";

/**
 * TagStats props
 */
interface TagStatsProps {

  /**
   * Tags stats
   */
  stats: LabelStat[];

  /**
   * All labels
   */
  labels: Label[];
}

/**
 * Render stats related to job tags
 */
export const StatisticLabels = observer((props: TagStatsProps) => {
  const {language} = languageStore;

  return (
    <>
      <HorizontalGridContainer className={styles.titleLine}>
        <Title
          level={HeadingLevel.h6}
          text={LanguageService.way.statisticsBlock.labelsName[language]}
          className={styles.statisticLabelsTitle}
          placeholder=""
        />
        <Title
          level={HeadingLevel.h6}
          text={LanguageService.way.statisticsBlock.jobsAmount[language]}
          className={styles.statisticLabelsTitle}
          placeholder=""
        />
        <Title
          level={HeadingLevel.h6}
          text={LanguageService.way.statisticsBlock.timeMinutes[language]}
          className={styles.statisticLabelsTitle}
          placeholder=""
        />
      </HorizontalGridContainer>

      {props.stats.map((tagStat) => (
        <VerticalContainer key={tagStat.label.uuid}>
          <StatisticLine
            name={tagStat.label.name}
            color={props.labels.find(label => label.uuid === tagStat.label.uuid)?.color ?? tagStat.label.color}
            amount={tagStat.jobsAmount}
            time={tagStat.time}
            amountPercentage={tagStat.jobsAmountPercentage}
            timePercentage={tagStat.timePercentage}
          />
          <Separator />
        </VerticalContainer>
      ))
      }
    </>
  );

});
