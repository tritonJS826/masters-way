import {Fragment} from "react";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {Label} from "src/logic/wayPage/labels/label/Label";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticLine} from "src/logic/wayPage/wayStatistics/StatisticLine";
import {LanguageService} from "src/service/LangauageService";
import {Symbols} from "src/utils/Symbols";

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
export const TagStats = (props: TagStatsProps) => {
  const {language} = useGlobalContext();

  return props.stats.map((tagStat) => (
    <Fragment key={tagStat.jobTag.uuid}>
      <StatisticLine
        description={
          <HorizontalContainer>
            <Label
              label={tagStat.jobTag}
              isSmall
            />
            <span>
              {Symbols.NO_BREAK_SPACE}
              {LanguageService.way.statisticsBlock.jobsAmount[language]}
            </span>
          </HorizontalContainer>
        }
        value={`${tagStat.totalAmount} (${tagStat.totalAmountPercentage}%)`}

      />
      <StatisticLine
        description={
          <HorizontalContainer>
            <Label
              label={tagStat.jobTag}
              isSmall
            />
            <span>
              {Symbols.NO_BREAK_SPACE}
              {LanguageService.way.statisticsBlock.timeMinutes[language]}
            </span>
          </HorizontalContainer>
        }
        value={`${tagStat.totalTime} (${tagStat.totalTimePercentage}%)`}

      />
    </Fragment>
  ));
};
