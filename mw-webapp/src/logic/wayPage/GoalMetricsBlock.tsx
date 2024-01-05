import {useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalMetricDAL} from "src/dataAccessLogic/GoalMetricDAL";
import {useGlobalContext} from "src/GlobalContext";
import {renderModalContent} from "src/logic/wayPage/reportsTable/WayColumns";
import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";
import {v4 as uuidv4} from "uuid";
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
 * GoalMetricStatisticsBlock Props
 */
interface GoalMetricStatisticsBlockProps {

  /**
   * Is visible
   * @default true
   */
  isVisible: boolean;

  /**
   * Way
   */
  way: Way;

}

/**
 * Goal metrics block
 */
export const GoalMetricStatisticsBlock = (props: GoalMetricStatisticsBlockProps) => {
  const [way, setWay] = useState<Way>(props.way);
  const {user} = useGlobalContext();

  const isOwner = !!user && user.uuid === way.owner.uuid;

  /**
   * Set goal metric to the way state
   */
  const setGoalMetric = (updatedGoalMetric: GoalMetric) => {
    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
  };

  /**
   * Remove singular goal Metric from goal
   */
  const removeSingularGoalMetric = async (singularGoalMetricUuid: string) => {
    const goalMetricToUpdate: GoalMetric = structuredClone(way.goal.metrics[0]);
    const indexToDelete = goalMetricToUpdate.metricUuids.indexOf(singularGoalMetricUuid);

    const AMOUNT_TO_DELETE = 1;
    goalMetricToUpdate.metricUuids.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.description.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.isDone.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.doneDate.splice(indexToDelete, AMOUNT_TO_DELETE);

    const updatedGoalMetric: GoalMetric = new GoalMetric(goalMetricToUpdate);

    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
    await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
  };

  /**
   * Change goal metric
   */
  const updateGoalMetric = async (updatedSingleGoalMetric: SingleGoalMetric) => {
    const goalMetricToUpdate: GoalMetric = structuredClone(way.goal.metrics[0]);
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

    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
    await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
  };

  /**
   * Render goal metric
   */
  const renderSingleGoalMetric = (singleGoalMetric: SingleGoalMetric) => {
    const tooltipContent = singleGoalMetric.isDone
      ? `Done date ${DateUtils.getShortISODateValue(singleGoalMetric.doneDate)}`
      : "Not finished yet...";

    return (
      <div
        key={singleGoalMetric.metricUuid}
        className={styles.singularMetric}
      >
        <HorizontalContainer className={styles.horizontalContainer}>
          <Checkbox
            isEditable={isOwner}
            isDefaultChecked={singleGoalMetric.isDone}
            className={styles.checkbox}
            onChange={(isDone) => {
              const updatedSingleGoalMetric = new SingleGoalMetric({
                ...singleGoalMetric,
                isDone,
                doneDate: new Date(),
              });
              updateGoalMetric(updatedSingleGoalMetric);
            }
            }
          />
          <Tooltip content={tooltipContent}>
            <EditableText
              text={singleGoalMetric.description ?? ""}
              onChangeFinish={(description) => updateGoalMetric(
                new SingleGoalMetric({...singleGoalMetric, description}),
              )}
              isEditable={isOwner}
            />
          </Tooltip>
        </HorizontalContainer>
        {isOwner && (
          <Tooltip content="Delete goal metric">
            <TrashIcon
              className={styles.icon}
              onClick={() => renderModalContent({
                description: `Are you sure that you want to delete singleGoalMetric "${singleGoalMetric.description}"?`,

                /**
                 * CallBack remove singular goal metric
                 */
                onOk: () => removeSingularGoalMetric(singleGoalMetric.metricUuid),
              })}
            />
          </Tooltip>
        )
        }
      </div>
    );
  };

  /**
   * Render button Add goal metrics
   */
  const renderButtonAddMetrics = () => {
    return (
      <>
        {isOwner && (
          <Button
            value="Add new goal metric"
            onClick={async () => {

              /**
               * Get current goal metric from way
               */
              const currentGoalMetric = way.goal.metrics[0];

              const updatedGoalMetric = new GoalMetric({
                uuid: currentGoalMetric.uuid,
                description: currentGoalMetric.description.concat(""),
                metricUuids: currentGoalMetric.metricUuids.concat(uuidv4()),
                isDone: currentGoalMetric.isDone.concat(false),
                doneDate: currentGoalMetric.doneDate.concat(new Date()),
              });

              setGoalMetric(updatedGoalMetric);
              await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
            }}
          />
        )
        }
      </>
    );
  };

  /**
   * Render goal metrics
   */
  const renderGoalMetric = (goalMetric: GoalMetric) => {
    return (
      <>
        {goalMetric.metricUuids.map((metricUuid, index) => renderSingleGoalMetric(
          {
            uuid: goalMetric.uuid,
            metricUuid,
            description: goalMetric.description[index],
            doneDate: goalMetric.doneDate[index],
            isDone: goalMetric.isDone[index],
          },
        ))
        }
        {renderButtonAddMetrics()}
      </>
    );
  };

  return (
    <>
      {props.isVisible && renderGoalMetric(way.goal.metrics[0])}
    </>
  );
};
