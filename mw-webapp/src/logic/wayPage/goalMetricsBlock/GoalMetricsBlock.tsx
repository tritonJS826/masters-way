import {wayMetricsAccessIds} from "cypress/accessIds/wayMetricsAccessIds";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {Modal} from "src/component/modal/Modal";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {MetricChildrenList} from "src/logic/wayPage/goalMetricsBlock/goalMetricList/GoalMetricList";
import {MetricsAiModal} from "src/logic/wayPage/goalMetricsBlock/MetricsAiModal";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LanguageService";
import {GoalMetricsFilter} from "src/utils/LocalStorageWorker";
import styles from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock.module.scss";

/**
 * GoalMetricStatisticsBlock Props
 */
interface GoalMetricStatisticsBlockProps {

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
   * Goal metrics filter
   */
  goalMetricsFilter: GoalMetricsFilter;

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

  /**
   * On filter change
   */
  onFilterChange: (filter: GoalMetricsFilter) => void;
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

  /**
   * Flattens metric tree into array including all nested children
   */
  const flattenMetrics = (metrics: Metric[]): Metric[] => {
    return metrics.flatMap(metric => {
      if (!metric.children) {
        return [metric];
      }

      return [
        metric,
        ...flattenMetrics(metric.children),
      ];
    });

  };
  const flattenedMetrics = flattenMetrics(props.goalMetrics);
  const doneMetricsCount = flattenedMetrics.filter((metric) => metric.isDone).length;
  const totalMetricsCount = flattenedMetrics.length;

  return (
    <VerticalContainer>
      <HorizontalContainer className={styles.horizontalContainer}>
        <HorizontalContainer>
          <Infotip content={LanguageService.way.infotip.metrics[language]} />
          <Title
            level={HeadingLevel.h3}
            text={LanguageService.way.metricsBlock.metrics[language]}
            placeholder=""
          />
        </HorizontalContainer>
        <Select
          name="goalMetricsVisibility"
          value={props.goalMetricsFilter}
          options={[
            {
              id: GoalMetricsFilter.All,
              value: GoalMetricsFilter.All,
              text: LanguageService.way.metricsBlock.goalMetricsFilterAll[language],
            },
            {
              id: GoalMetricsFilter.None,
              value: GoalMetricsFilter.None,
              text: LanguageService.way.metricsBlock.goalMetricsFilterNone[language],
            },
            {
              id: GoalMetricsFilter.Incomplete,
              value: GoalMetricsFilter.Incomplete,
              text: LanguageService.way.metricsBlock.goalMetricsFilterIncomplete[language],
            },
          ]}
          onChange={(value) => {
            props.onFilterChange(value);
          }}
        />
      </HorizontalContainer>
      <VerticalContainer className={styles.goalMetricsBlock}>
        <ProgressBar
          textToLabel={LanguageService.common.metrics[language]}
          value={doneMetricsCount}
          max={totalMetricsCount}
          cy={{
            root: "",
            leftLabel: wayMetricsAccessIds.progressBar.leftLabel,
            rightLabel: wayMetricsAccessIds.progressBar.rightLabel,
          }}
        />
        {props.goalMetricsFilter !== GoalMetricsFilter.None && (
          <>
            <MetricChildrenList
              level={0}
              metrics={props.goalMetrics}
              deleteMetric={(metricUuid: string) => deleteMetric(metricUuid)}
              isEditable={props.isEditable}
              addMetric={(parentUuid: string) => addEmptyMetric(parentUuid)}
              goalMetricsFilter={props.goalMetricsFilter}
            />
            {props.isEditable && (
              <HorizontalGridContainer className={styles.addMetricButtons}>
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
              </HorizontalGridContainer>
            )}
          </>
        )}
      </VerticalContainer>
    </VerticalContainer>
  );
});
