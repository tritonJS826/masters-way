import {useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalMetricDAL} from "src/dataAccessLogic/GoalMetricDAL";
import {renderModalContent} from "src/logic/wayPage/reportsTable/WayColumns";
import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Singular metric for goal
 */
class SingleGoalMetric {

  /**
   * Goal metric uuid
   */
  public uuid: string;

  /**
   * Metric uuid
   */
  public metricUuid: string;

  /**
   * Metric description
   */
  public description: string;

  /**
   * Metric is done or not
   */
  public isDone: boolean;

  /**
   * Date when metric was done
   */
  public doneDate: Date;

  constructor(params: SingleGoalMetric) {
    this.uuid = params.uuid;
    this.metricUuid = params.metricUuid;
    this.description = params.description;
    this.isDone = params.isDone;
    this.doneDate = params.doneDate;
  }

}

/**
 * Single Goal Metric Props
 */
interface SingleGoalMetricProps {

  /**
   * Single goal mentric
   */
  singleGoalMetric: SingleGoalMetric;

  /**
   * Is editable
   */
  isEditable: boolean;

  /**
   * Way
   */
  way: Way;

  /**
   * Callback for change way
   */
  setWay: (newWay: Way) => void;
}

/**
 * Goal metric
 */
export const GoalMetricItem = (props: SingleGoalMetricProps) => {
  const [modalElementUuid, setModalElementUuid] = useState<string>();
  const isModalElementUuidExist = !!modalElementUuid;

  /**
   * Remove singular goal Metric from goal
   */
  const removeSingularGoalMetric = async (singularGoalMetricUuid: string) => {
    const goalMetricToUpdate: GoalMetric = structuredClone(props.way.goal.metrics[0]);
    const indexToDelete = goalMetricToUpdate.metricUuids.indexOf(singularGoalMetricUuid);

    const AMOUNT_TO_DELETE = 1;
    goalMetricToUpdate.metricUuids.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.description.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.isDone.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.doneDate.splice(indexToDelete, AMOUNT_TO_DELETE);

    const updatedGoalMetric: GoalMetric = new GoalMetric(goalMetricToUpdate);

    props.setWay(new Way({...props.way, goal: new Goal({...props.way.goal, metrics: [updatedGoalMetric]})}));
    await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
  };

  /**
   * Change goal metric
   */
  const updateGoalMetric = async (updatedSingleGoalMetric: SingleGoalMetric) => {
    const goalMetricToUpdate: GoalMetric = structuredClone(props.way.goal.metrics[0]);
    const changedIndex = goalMetricToUpdate.metricUuids.indexOf(updatedSingleGoalMetric.metricUuid);

    const updatedGoalMetric: GoalMetric = new GoalMetric({
      ...goalMetricToUpdate,
      description: goalMetricToUpdate.description.map(
        (item, index) => index === changedIndex ? updatedSingleGoalMetric.description : item,
      ),
      isDone: goalMetricToUpdate.isDone.map(
        (item, index) => index === changedIndex ? updatedSingleGoalMetric.isDone : item,
      ),
      doneDate: goalMetricToUpdate.doneDate.map(
        (item, index) => index === changedIndex ? updatedSingleGoalMetric.doneDate : item,
      ),
    });

    props.setWay(new Way({...props.way, goal: new Goal({...props.way.goal, metrics: [updatedGoalMetric]})}));
    await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
  };

  const tooltipContent = props.singleGoalMetric.isDone
    ? `Done date ${DateUtils.getShortISODateValue(props.singleGoalMetric.doneDate)}`
    : "Not finished yet...";

  return (
    <div
      key={props.singleGoalMetric.metricUuid}
      className={styles.singularMetric}
    >
      <HorizontalContainer className={styles.horizontalContainer}>
        <Checkbox
          isEditable={props.isEditable}
          isDefaultChecked={props.singleGoalMetric.isDone}
          className={styles.checkbox}
          onChange={(isDone) => {
            const updatedSingleGoalMetric = new SingleGoalMetric({
              ...props.singleGoalMetric,
              isDone,
              doneDate: new Date(),
            });
            updateGoalMetric(updatedSingleGoalMetric);
          }
          }
        />
        <Tooltip content={tooltipContent}>
          <EditableText
            text={props.singleGoalMetric.description ?? ""}
            onChangeFinish={(description) => updateGoalMetric(
              new SingleGoalMetric({...props.singleGoalMetric, description}),
            )}
            isEditable={props.isEditable}
          />
        </Tooltip>
      </HorizontalContainer>
      {props.isEditable && (
        <Tooltip content="Delete goal metric">
          <TrashIcon
            className={styles.icon}
            onClick={() => setModalElementUuid(props.singleGoalMetric.metricUuid)}
          />
          {isModalElementUuidExist && modalElementUuid === props.singleGoalMetric.metricUuid &&
            renderModalContent({
              description: `Are you sure that you want to delete singleGoalMetric "${props.singleGoalMetric.description}"?`,

              /**
               * CallBack triggered on press ok
               */
              onOk: () => removeSingularGoalMetric(props.singleGoalMetric.metricUuid),
            })
          }
        </Tooltip>
      )
      }
    </div>
  );
};
