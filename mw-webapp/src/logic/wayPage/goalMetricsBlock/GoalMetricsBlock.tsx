import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {GoalMetricItem} from "src/logic/wayPage/goalMetricsBlock/GoalMetricItem";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LanguageService";
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
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Way's uuid
   */
  wayUuid: string;

  /**
   * Callback to add metric
   */
  addMetric: (metric: Metric) => void;

  /**
   * Callback to delete metric
   */
  deleteMetric: (metricUuid: string) => void;

}

/**
 * Goal metrics block
 */
export const GoalMetricsBlock = observer((props: GoalMetricStatisticsBlockProps) => {
  const {language} = languageStore;

  /**
   * Add metric
   */
  const addMetric = async () => {
    const newMetric = await MetricDAL.createMetric(props.wayUuid);
    props.addMetric(newMetric);
  };

  /**
   * Render button Add goal metrics
   */
  const renderButtonAddMetrics = () => {
    return (
      <>
        {props.isEditable && (
          <Button
            value={LanguageService.way.metricsBlock.addNewGoalMetricButton[language]}
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
    props.deleteMetric(metricUuid);
    await MetricDAL.deleteMetric(metricUuid);
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
});
