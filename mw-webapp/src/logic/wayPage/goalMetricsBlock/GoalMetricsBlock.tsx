import {wayMetricsAccessIds} from "cypress/accessIds/wayMetricsAccessIds";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {GoalMetricItem} from "src/logic/wayPage/goalMetricsBlock/GoalMetricItem";
import {MetricsAiModal} from "src/logic/wayPage/goalMetricsBlock/MetricsAiModal";
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

  /**
   * Goal description
   */
  goalDescription: string;

  /**
   * Way name
   */
  wayName: string;
}

/**
 * Goal metrics block
 */
export const GoalMetricsBlock = observer((props: GoalMetricStatisticsBlockProps) => {
  const {language} = languageStore;

  /**
   * Add metric
   */
  const addEmptyMetric = async (parentUuid: string | null) => {
    const newMetric = await MetricDAL.createMetric({
      wayUuid: props.wayUuid,
      parentUuid,
    });
    props.addMetric(newMetric);
  };

  /**
   * Delete metric
   */
  const deleteMetric = async (metricUuid: string) => {
    props.deleteMetric(metricUuid);
    await MetricDAL.deleteMetric(metricUuid);
  };

  const doneMetricsAmount = props.goalMetrics.filter((metric) => !!metric.isDone).length;

  return (
    props.isVisible &&
    <VerticalContainer className={styles.goalMetricsBlock}>
      <ProgressBar
        value={doneMetricsAmount}
        max={props.goalMetrics.length}
      />
      {props.goalMetrics.map((metric) => {
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
      {props.isEditable &&
      <VerticalContainer className={styles.addMetricButtons}>
        <Button
          value={LanguageService.way.metricsBlock.addNewGoalMetricButton[language]}
          onClick={() => addEmptyMetric(null)}
          dataCy={wayMetricsAccessIds.metricButtons.addNewGoalMetricButton}
        />
        <Modal
          trigger={
            <Button
              value={LanguageService.way.metricsBlock.generateNewGoalMetricsWithAIButton[language]}
              onClick={() => {}}
              className={styles.addMetricButton}
              dataCy={wayMetricsAccessIds.metricButtons.generateNewMetricsAiButton}
            />
          }
          content={
            <MetricsAiModal
              addMetric={props.addMetric}
              goalDescription={props.goalDescription}
              goalMetrics={props.goalMetrics}
              wayName={props.wayName}
              wayUuid={props.wayUuid}
            />
          }
          isFitContent={false}
        />
      </VerticalContainer>
      }
    </VerticalContainer>

  );
});
