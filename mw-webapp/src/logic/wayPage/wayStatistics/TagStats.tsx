import {Fragment} from "react";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticLine} from "src/logic/wayPage/wayStatistics/StatisticLine";
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
  return props.stats.map((tagStat) => (
    <Fragment key={tagStat.jobTag.uuid}>
      <StatisticLine
        description={
          <HorizontalContainer>
            <JobTag
              jobTag={tagStat.jobTag}
              isSmall
            />
            <span>
              {Symbols.NO_BREAK_SPACE}
              jobs amount:
            </span>
          </HorizontalContainer>
        }
        value={`${tagStat.totalAmount} (${tagStat.totalAmountPercentage}%)`}

      />
      <StatisticLine
        description={
          <HorizontalContainer>
            <JobTag
              jobTag={tagStat.jobTag}
              isSmall
            />
            <span>
              {Symbols.NO_BREAK_SPACE}
              time (minutes):
            </span>
          </HorizontalContainer>
        }
        value={`${tagStat.totalTime} (${tagStat.totalTimePercentage}%)`}

      />
    </Fragment>
  ));
};
