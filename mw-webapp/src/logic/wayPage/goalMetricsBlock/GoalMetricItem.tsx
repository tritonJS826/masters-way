import {TrashIcon} from "@radix-ui/react-icons";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Metric} from "src/model/businessModel/Metric";
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
export const GoalMetricItem = (props: SingleGoalMetricProps) => {
  const tooltipContent = props.metric.isDone && props.metric.doneDate
    ? `Done date ${DateUtils.getShortISODateValue(props.metric.doneDate)}`
    : "Not finished yet...";

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
                {`Are you sure that you want set metric ${props.metric.description} as not completed`}
              </p>}
              onOk={onOk}
              okText="Confirm"
              cancelText="Cancel"
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
          />
        </Tooltip>
      </HorizontalContainer>
      {props.isEditable && (
        <Tooltip content="Delete goal metric">
          <Confirm
            trigger={
              <TrashIcon />}
            content={<p>
              {`Are you sure that you want to delete goal metric "${props.metric.description}"?`}
            </p>}
            onOk={() => props.deleteMetric(props.metric.uuid)}
            okText="Delete"
            cancelText="Cancel"
          />
        </Tooltip>
      )
      }
    </div>
  );
};
