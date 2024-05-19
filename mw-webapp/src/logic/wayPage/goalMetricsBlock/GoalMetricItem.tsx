import {TrashIcon} from "@radix-ui/react-icons";
import {observer} from "mobx-react-lite";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {languageStore} from "src/globalStore/LanguageStore";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/goalMetricsBlock/GoalMetricItem.module.scss";

/**
 * Single Goal Metric Props
 */
interface SingleGoalMetricProps {

  /**
   * Single goal metric
   */
  metric: Metric;

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to delete metric
   */
  deleteMetric: (metricUuid: string) => Promise<void>;

  /**
   * Callback to update Metric
   */
  updateMetric: (metric: Metric) => Promise<void>;

}

/**
 * Goal metric
 */
export const GoalMetricItem = observer((props: SingleGoalMetricProps) => {
  const {language} = languageStore;
  const tooltipContent = props.metric.isDone && props.metric.doneDate
    ? `${LanguageService.way.metricsBlock.doneDate[language]} ${DateUtils.getShortISODateValue(props.metric.doneDate)}`
    : `${LanguageService.way.metricsBlock.notFinished[language]}`;

  /**
   * Set metric not completed
   */
  const onOk = () => {
    props.updateMetric({...props.metric, isDone: false, doneDate: null});
  };

  return (
    <div
      key={props.metric.uuid}
      className={styles.singularMetric}
    >
      <HorizontalContainer className={styles.metricDescriptionAndCheckbox}>
        {props.metric.isDone && props.isEditable
          ? (
            <Confirm
              content={<p>
                {`${LanguageService.way.metricsBlock.uncheckGoalMetricQuestionPartOne[language]} ${props.metric.description}
                ${LanguageService.way.metricsBlock.uncheckGoalMetricQuestionPartTwo[language]}`}
              </p>}
              onOk={onOk}
              okText={LanguageService.modals.confirmModal.confirmButton[language]}
              cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
              trigger={
                <Checkbox
                  isDisabled={true}
                  isDefaultChecked={props.metric.isDone}
                  className={styles.checkbox}
                  onChange={(isDone) => isDone}
                />
              }
            />
          )
          : (
            <Checkbox
              isDisabled={!props.isEditable}
              isDefaultChecked={props.metric.isDone}
              className={styles.checkbox}
              onChange={(isDone) => props.updateMetric({...props.metric, isDone, doneDate: new Date()})}
            />
          )
        }
        <Tooltip
          content={tooltipContent}
          className={styles.tooltip}
        >
          <EditableTextarea
            text={props.metric.description ?? ""}
            onChangeFinish={(description) => props.updateMetric({...props.metric, description})}
            isEditable={props.isEditable}
            placeholder={LanguageService.common.emptyMarkdown[language]}
          />
        </Tooltip>
      </HorizontalContainer>
      {props.isEditable && (
        <Tooltip content={LanguageService.way.metricsBlock.deleteGoalMetricTooltip[language]}>
          <Confirm
            trigger={
              <TrashIcon />}
            content={<p>
              {`${LanguageService.way.metricsBlock.deleteGoalMetricQuestion[language]} "${props.metric.description}"?`}
            </p>}
            onOk={() => props.deleteMetric(props.metric.uuid)}
            okText={LanguageService.modals.confirmModal.deleteButton[language]}
            cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
          />
        </Tooltip>
      )
      }
    </div>
  );
});
