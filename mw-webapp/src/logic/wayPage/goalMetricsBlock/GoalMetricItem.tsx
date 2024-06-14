import {TrashIcon} from "@radix-ui/react-icons";
import {observer} from "mobx-react-lite";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
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
  const onOk = async () => {
    props.metric.updateIsDone({
      isDoneToUpdate: false,
      doneDateToUpdate: null,
    });
    const metricToUpdate = {
      uuid: props.metric.uuid,
      isDone: false,
      doneDate: null,
    };
    await MetricDAL.updateMetric(metricToUpdate);
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
                  onChange={() => {}}
                />
              }
            />
          )
          : (
            <Checkbox
              isDisabled={!props.isEditable}
              isDefaultChecked={props.metric.isDone}
              className={styles.checkbox}
              onChange={async (isDone) => {
                props.metric.updateIsDone({
                  isDoneToUpdate: isDone,
                  doneDateToUpdate: new Date(),
                });
                const metricToUpdate = {
                  uuid: props.metric.uuid,
                  isDone,
                };
                await MetricDAL.updateMetric(metricToUpdate);
              }}
            />
          )
        }
        <div className={styles.metricDescriptionWrapper}>
          <Tooltip
            content={tooltipContent}
            className={styles.tooltip}
          >
            <EditableTextarea
              text={props.metric.description ?? ""}
              onChangeFinish={async (description) => {
                props.metric.updateDescription(description);
                const metricToUpdate = {
                  uuid: props.metric.uuid,
                  description,
                };
                await MetricDAL.updateMetric(metricToUpdate);
              }}
              isEditable={props.isEditable}
              placeholder={props.isEditable
                ? LanguageService.common.emptyMarkdownAction[language]
                : LanguageService.common.emptyMarkdown[language]}
            />
          </Tooltip>
        </div>

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
