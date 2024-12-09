import {wayMetricsAccessIds} from "cypress/accessIds/wayMetricsAccessIds";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {MetricDAL} from "src/dataAccessLogic/MetricDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Metric} from "src/model/businessModel/Metric";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/goalMetricsBlock/goalMetricList/GoalMetricList.module.scss";

/**
 * {@link MetricChildrenList} props
 */
interface MetricChildrenListProps {

    /**
     * Root metrics
     */
  metrics: Metric[];

  /**
   * Child level (root is 0)
   */
  level: number;

  /**
   * Is metric editable
   */
  isEditable: boolean;

  /**
   * Callback update day reports on trigger
   */
  deleteMetric: (metricUuid: string) => void;

  /**
   * Add nested metric
   */
  addMetric: (parentUuid: string, parentMetric: Metric | null) => void;

}

const LEVEL_INCREMENT = 1;

/**
 * Item for metric children list
 */
export const MetricChildrenList = (props: MetricChildrenListProps) => {
  const {language} = languageStore;

  /**
   * ChildrenItem
   */
  const renderChildrenItem = (childMetric: Metric) => {

    const tooltipContent = childMetric.isDone && childMetric.doneDate
      ? `${LanguageService.way.metricsBlock.doneDate[language]} ${DateUtils.getShortISODateValue(childMetric.doneDate)}`
      : `${LanguageService.way.metricsBlock.notFinished[language]}`;

    /**
     * Set metric not completed
     */
    const onOk = async () => {
      childMetric.updateIsDone({
        isDoneToUpdate: false,
        doneDateToUpdate: null,
      });
      const metricToUpdate = {
        uuid: childMetric.uuid,
        isDone: false,
      };
      await MetricDAL.updateMetric(metricToUpdate);
    };

    return (
      <VerticalContainer>
        <HorizontalContainer className={styles.singularMetric}>
          <HorizontalContainer className={styles.metricDescriptionAndCheckbox}>
            {Symbols.LAST_NESTED_MARKER.repeat(props.level)}
            {childMetric.isDone && props.isEditable
              ? (
                <Confirm
                  content={<p>
                    {`${LanguageService.way.metricsBlock.uncheckGoalMetricQuestionPartOne[language]} ${childMetric.description}
                ${LanguageService.way.metricsBlock.uncheckGoalMetricQuestionPartTwo[language]}`}
                  </p>}
                  onOk={onOk}
                  okText={LanguageService.modals.confirmModal.confirmButton[language]}
                  cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  trigger={
                    <Checkbox
                      isDisabled={!props.isEditable}
                      isDefaultChecked={childMetric.isDone}
                      className={styles.checkbox}
                      onChange={() => {}}
                    />
                  }
                />
              )
              : (
                <Checkbox
                  isDisabled={!props.isEditable}
                  isDefaultChecked={childMetric.isDone}
                  className={styles.checkbox}
                  onChange={async (isDone) => {
                    childMetric.updateIsDone({
                      isDoneToUpdate: isDone,
                      doneDateToUpdate: new Date(),
                    });
                    const metricToUpdate = {
                      uuid: childMetric.uuid,
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
                  text={childMetric.description ?? ""}
                  onChangeFinish={async (description) => {
                    childMetric.updateDescription(description);
                    const metricToUpdate = {
                      uuid: childMetric.uuid,
                      description,
                    };
                    await MetricDAL.updateMetric(metricToUpdate);
                  }}
                  isEditable={props.isEditable}
                  placeholder={props.isEditable
                    ? LanguageService.common.emptyMarkdownAction[language]
                    : LanguageService.common.emptyMarkdown[language]}
                  cy={
                    {
                      textArea: wayMetricsAccessIds.metricDescriptionInput,
                      trigger: wayMetricsAccessIds.metricDescription,
                    }
                  }
                />
              </Tooltip>
            </div>

          </HorizontalContainer>
          {props.isEditable && (
            <HorizontalContainer className={styles.metricACtionButtons}>
              <Button
                icon={
                  <Icon
                    size={IconSize.SMALL}
                    name="PlusIcon"
                  />
                }
                buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                onClick={() => props.addMetric(childMetric.uuid, childMetric)}
              />
              <Tooltip content={LanguageService.way.metricsBlock.deleteGoalMetricTooltip[language]}>
                <Confirm
                  trigger={
                    <Button
                      icon={
                        <Icon
                          size={IconSize.SMALL}
                          name="TrashIcon"
                        />
                      }
                      buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                      onClick={() => {}}
                      dataCy={wayMetricsAccessIds.deleteMetric.trashButton}
                    />
                  }
                  content={<p>
                    {renderMarkdown(
                      `${LanguageService.way.metricsBlock.deleteGoalMetricQuestion[language]} "${childMetric.description}"?`,
                    )}
                  </p>}
                  onOk={() => props.deleteMetric(childMetric.uuid)}
                  okText={LanguageService.modals.confirmModal.deleteButton[language]}
                  cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  cy={
                    {
                      onEnter: "",
                      onCancel: wayMetricsAccessIds.deleteMetric.cancelButton,
                      onOk: wayMetricsAccessIds.deleteMetric.deleteButton,
                    }
                  }
                />
              </Tooltip>
            </HorizontalContainer>
          )
          }
        </HorizontalContainer>
        <MetricChildrenList
          level={props.level + LEVEL_INCREMENT}
          metrics={childMetric.children}
          deleteMetric={props.deleteMetric}
          isEditable={props.isEditable}
          addMetric={props.addMetric}
        />
      </VerticalContainer>
    );
  };

  const childrenList = props.metrics.map(renderChildrenItem);

  return childrenList;
};
