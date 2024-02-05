import {Fragment} from "react";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticLine} from "src/logic/wayPage/wayStatistics/StatisticLine";

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
    <Fragment key={tagStat.name}>
      <StatisticLine
        description={<JobTag
          key={tagStat.name}
          jobTag={tagStat.name}
          isSmall
        />}
        value={`${tagStat.totalAmount} (${tagStat.totalAmountPercentage}%)`}

      />
      <StatisticLine
        description={<JobTag
          key={tagStat.name}
          jobTag={tagStat.name}
          isSmall
        />}
        value={`${tagStat.totalTime} (${tagStat.totalTimePercentage}%)`}

      />
    </Fragment>
  ));
};
