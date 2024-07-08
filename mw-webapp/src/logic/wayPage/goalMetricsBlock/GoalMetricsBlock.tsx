import {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
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
  const [generatedMetrics, setGeneratedMetrics] = useState("hi");

  /**
   * Add metric
   */
  const addMetric = async () => {
    const newMetric = await MetricDAL.createMetric(props.wayUuid);
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

  /**
   * Generate AI metrics
   */
  const generateAIMetrics = async () => {
    const metrics = await AIDAL.generateMetrics({
      goalDescription: "goal",
      metrics: props.goalMetrics,
      wayName: "way",
    });

    setGeneratedMetrics(metrics);
  };

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
        <HorizontalContainer>
          <Button
            value={LanguageService.way.metricsBlock.addNewGoalMetricButton[language]}
            onClick={addMetric}
          />
          <Confirm
            trigger={
              <Button
                value={LanguageService.way.metricsBlock.generateNewGoalMetricsWithAIButton[language]}
                onClick={() => generateAIMetrics()}
              />
            }
            content={<>
              {generatedMetrics}
            </>}
            onOk={() => {}}
            okText={LanguageService.way.metricsBlock.addNewGoalMetricsButton[language]}
            cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
          />
        </HorizontalContainer>
        }
      </VerticalContainer>

  );
});
