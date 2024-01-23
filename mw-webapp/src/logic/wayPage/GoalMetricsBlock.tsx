import {useState} from "react";
import {Button} from "src/component/button/Button";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {GoalMetricDAL} from "src/dataAccessLogic/GoalMetricDAL";
import {GoalMetricItem} from "src/logic/wayPage/GoalMetricItem";
import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Way} from "src/model/businessModel/Way";
import {v4 as uuidv4} from "uuid";

const MAX_PERCENTAGE = 100;

/**
 * GoalMetricStatisticsBlock Props
 */
interface GoalMetricStatisticsBlockProps {

  /**
   * Is visible
   * @default true
   */
  isVisible: boolean;

  /**
   * Way
   */
  way: Way;

  /**
   * Is editable
   */
  isEditable: boolean;

}

/**
 * Goal metrics block
 */
export const GoalMetricsBlock = (props: GoalMetricStatisticsBlockProps) => {
  const [way, setWay] = useState<Way>(props.way);

  /**
   * Set goal metric to the way state
   */
  const setGoalMetric = (updatedGoalMetric: GoalMetric) => {
    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
  };

  /**
   * Render button Add goal metrics
   */
  const renderButtonAddMetrics = () => {
    return (
      <>
        {props.isEditable && (
          <Button
            value="Add new goal metric"
            onClick={async () => {

              /**
               * Get current goal metric from way
               */
              const currentGoalMetric = way.goal.metrics[0];

              const updatedGoalMetric = new GoalMetric({
                uuid: currentGoalMetric.uuid,
                description: currentGoalMetric.description.concat(""),
                metricUuids: currentGoalMetric.metricUuids.concat(uuidv4()),
                isDone: currentGoalMetric.isDone.concat(false),
                doneDate: currentGoalMetric.doneDate.concat(new Date()),
              });

              setGoalMetric(updatedGoalMetric);
              await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
            }}
          />
        )
        }
      </>
    );
  };

  /**
   * Render goal metrics
   */
  const renderGoalMetrics = (goalMetric: GoalMetric) => {
    const countTrue = goalMetric.isDone.filter((item) => item).length;
    const computedProcent = countTrue > 0 ? (MAX_PERCENTAGE / goalMetric.isDone.length) * countTrue : 0;

    return (
      <>
        <ProgressBar
          percentage= {computedProcent}
          text={`${computedProcent}%`}
        />
        {goalMetric.metricUuids.map((metricUuid, index) => {
          return (
            <GoalMetricItem
              key={metricUuid}
              singleGoalMetric={{
                uuid: goalMetric.uuid,
                metricUuid,
                description: goalMetric.description[index],
                doneDate: goalMetric.doneDate[index],
                isDone: goalMetric.isDone[index],
              }}
              way={way}
              setWay={setWay}
              isEditable={props.isEditable}
            />
          );
        })
        }
      </>
    );
  };

  return (
    <>
      {props.isVisible &&
        <>
          {renderGoalMetrics(way.goal.metrics[0])}
          {renderButtonAddMetrics()}
        </>
      }
    </>
  );
};
