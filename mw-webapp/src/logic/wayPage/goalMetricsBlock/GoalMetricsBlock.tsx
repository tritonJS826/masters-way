import {Button} from "src/component/button/Button";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {useGlobalContext} from "src/GlobalContext";
import {GoalMetricItem} from "src/logic/wayPage/goalMetricsBlock/GoalMetricItem";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LangauageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock.module.scss";

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
   * Goal metrics
   */
  goalMetrics: Metric[];

  /**
   * Sdf
   */
  updateGoalMetrics: (goalMetrics: Metric[]) => Promise<void>;

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

}

/**
 * Goal metrics block
 */
export const GoalMetricsBlock = (props: GoalMetricStatisticsBlockProps) => {
  const {language} = useGlobalContext();

  /**
   * Add metric
   */
  const addMetric = async () => {
    const newMetric = new Metric({
      uuid: uuidv4(),
      description: "",
      isDone: false,
      doneDate: null,
    });

    const updatedGoalMetrics = props.goalMetrics.concat(newMetric);
    await props.updateGoalMetrics(updatedGoalMetrics);
  };

  /**
   * Render button Add goal metrics
   */
  const renderButtonAddMetrics = () => {
    return (
      <>
        {props.isEditable && (
          <Button
            value={LanguageService.way.metricsBlock.AddNewGoalMetricButton[language]}
            onClick={addMetric}
          />
        )
        }
      </>
    );
  };

  /**
   * Delete metric
   */
  const deleteMetric = async (metricUuid: string) => {
    const updatedMetrics = props.goalMetrics.filter((metric) => metric.uuid !== metricUuid);
    await props.updateGoalMetrics(updatedMetrics);
  };

  /**
   * Update metric
   */
  const updateMetric = async (metricToUpdate: PartialWithUuid<Metric>) => {
    const updatedMetrics = props.goalMetrics.map((metric) => {
      return metric.uuid === metricToUpdate.uuid
        ? {...metric, ...metricToUpdate}
        : metric;
    });

    await props.updateGoalMetrics(updatedMetrics);
  };

  /**
   * Render goal metrics
   */
  const renderGoalMetrics = (metrics: Metric[]) => {
    const doneMetricsAmount = metrics.filter((metric) => !!metric.isDone).length;

    return (
      <div className={styles.goalMetricsBlock}>
        <ProgressBar
          value={doneMetricsAmount}
          max={props.goalMetrics.length}
        />
        {metrics.map((metric) => {
          return (
            <GoalMetricItem
              key={metric.uuid}
              metric={metric}
              deleteMetric={deleteMetric}
              updateMetric={updateMetric}
              isEditable={props.isEditable}
            />
          );
        })
        }
      </div>
    );
  };

  return (
    <>
      {props.isVisible &&
        <>
          {renderGoalMetrics(props.goalMetrics)}
          {renderButtonAddMetrics()}
        </>
      }
    </>
  );
};
