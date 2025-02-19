import {wayMetricsAccessIds} from "cypress/accessIds/wayMetricsAccessIds";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Modal} from "src/component/modal/Modal";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {MetricChildrenList} from "src/logic/wayPage/goalMetricsBlock/goalMetricList/GoalMetricList";
import {MetricsAiModal} from "src/logic/wayPage/goalMetricsBlock/MetricsAiModal";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LanguageService";
import {WayPageSettings} from "src/utils/LocalStorageWorker";
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
   * Controls visibility of completed metrics
   * @default true
   */
  isCompletedMetricsVisible: boolean;

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
   * Way page settings
   */
  wayPageSettings: WayPageSettings;

  /**
   * Callback to update way page settings
   */
  updateWayPageSettings: (settings: WayPageSettings) => void;
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
        cy={{
          root: "",
          leftLabel: wayMetricsAccessIds.progressBar.leftLabel,
          rightLabel: wayMetricsAccessIds.progressBar.rightLabel,
        }}
      />
      <HorizontalContainer className={styles.tooltipContainer}>
        <Tooltip content={props.wayPageSettings.isCompletedMetricsVisible
          ? LanguageService.way.metricsBlock.clickToHideCompletedMetrics[language]
          : LanguageService.way.metricsBlock.clickToShowCompletedMetrics[language]
        }
        >
          <button
            className={styles.iconContainer}
            onClick={() => props.updateWayPageSettings({
              ...props.wayPageSettings,
              isCompletedMetricsVisible: !props.wayPageSettings.isCompletedMetricsVisible,
            })}
          >
            <Icon
              size={IconSize.MEDIUM}
              name={props.wayPageSettings.isCompletedMetricsVisible ? "EyeOpenedIcon" : "EyeSlashedIcon"}
            />
          </button>
        </Tooltip>
      </HorizontalContainer>

      <MetricChildrenList
        level={0}
        metrics={props.goalMetrics}
        deleteMetric={(metricUuid: string) => deleteMetric(metricUuid)}
        isEditable={props.isEditable}
        addMetric={(parentUuid: string) => addEmptyMetric(parentUuid)}
        isCompletedMetricsVisible={props.isCompletedMetricsVisible}
      />
      {props.isEditable &&
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
      }
    </VerticalContainer>

  );
});
