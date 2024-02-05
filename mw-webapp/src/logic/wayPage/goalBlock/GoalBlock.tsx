import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalMetricsBlock} from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock";
import {Metric} from "src/model/businessModel/Metric";
import {Way} from "src/model/businessModel/Way";
import {WayPageSettings} from "src/utils/LocalStorageWorker";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import styles from "src/logic/wayPage/goalBlock/GoalBlock.module.scss";

/**
 * Goal block props
 */
interface GoalBlockProps {

  /**
   * Way's goal
   */
  goalDescription: string;

  /**
   * Way's metrics
   */
  metrics: Metric[];

  /**
   * Df
   */
  wayUuid: string;

  /**
   * Callback to update goal
   */
  updateWay: (way: PartialWithUuid<Way>) => Promise<void>;

  /**
   * Is editable
   */
  isEditable: boolean;

  /**
   * Way page settings
   */
  wayPageSettings: WayPageSettings;

  /**
   * Update way settings
   */
  updateWaySettings: (settingsToUpdate: Partial<WayPageSettings>) => void;
}

/**
 * Goal block
 */
export const GoalBlock = (props: GoalBlockProps) => {

  /**
   * Update goal
   */
  const updateGoalMetrics = async (metricsToUpdate: Metric[]) => {
    const isWayCompleted = metricsToUpdate.every((metric) => metric.isDone === true);

    await props.updateWay({
      uuid: props.wayUuid,
      metrics: metricsToUpdate,
      isCompleted: isWayCompleted,
    });
  };

  return (
    <div className={styles.goalSection}>
      <div className={styles.goalSubSection}>
        <Title
          level={HeadingLevel.h3}
          text="Goal"
        />
        <EditableTextarea
          text={props.goalDescription}
          onChangeFinish={async (goalDescription) => await props.updateWay({
            uuid: props.wayUuid,
            goalDescription,
          })}
          rows={10}
          isEditable={props.isEditable}
          className={styles.goalDescription}
        />
      </div>
      <div className={styles.goalSubSection}>
        <HorizontalContainer className={styles.horizontalContainer}>
          <Title
            level={HeadingLevel.h3}
            text="Metrics"
          />
          <Tooltip content={`Click to ${props.wayPageSettings.isGoalMetricsVisible ? "hide" : "open"} goal metrics block`}>
            <div
              className={styles.iconContainer}
              onClick={() => props.updateWaySettings({isGoalMetricsVisible: !props.wayPageSettings.isGoalMetricsVisible})}
            >
              <button className={styles.iconWrapper}>
                {props.wayPageSettings.isGoalMetricsVisible ?
                  <Icon
                    size={IconSize.MEDIUM}
                    name="EyeOpenedIcon"
                  />
                  :
                  <Icon
                    size={IconSize.MEDIUM}
                    name="EyeSlashedIcon"
                  />
                }
              </button>
            </div>
          </Tooltip>
        </HorizontalContainer>
        <GoalMetricsBlock
          isVisible={props.wayPageSettings.isGoalMetricsVisible}
          goalMetrics={props.metrics}
          updateGoalMetrics={updateGoalMetrics}
          isEditable={props.isEditable}
        />
      </div>
    </div>
  );
};
