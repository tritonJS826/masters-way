import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {GoalMetricsBlock} from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock";
import {Goal} from "src/model/businessModel/Goal";
import {Metric} from "src/model/businessModel/Metric";
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
  goal: Goal;

  /**
   * Callback to update goal
   */
  updateGoal: (goal: PartialWithUuid<Goal>) => Promise<void>;

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
    await props.updateGoal({
      uuid: props.goal.uuid,
      metrics: metricsToUpdate,
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
          text={props.goal.description}
          onChangeFinish={async (description) => await GoalDAL.updateGoal({
            uuid: props.goal.uuid,
            description,
          })
          }
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
            </div>
          </Tooltip>
        </HorizontalContainer>
        <GoalMetricsBlock
          isVisible={props.wayPageSettings.isGoalMetricsVisible}
          goalMetrics={props.goal.metrics}
          updateGoalMetrics={updateGoalMetrics}
          isEditable={props.isEditable}
        />
      </div>
      <div className={styles.goalSubSection}>
        <HorizontalContainer className={styles.horizontalContainer}>
          <Title
            level={HeadingLevel.h3}
            text="Statistics"
          />
          <Tooltip content={`Click to ${props.wayPageSettings.isStatisticsVisible ? "hide" : "open"} statistics block`}>
            <div
              className={styles.iconContainer}
              onClick={() => props.updateWaySettings({isStatisticsVisible: !props.wayPageSettings.isStatisticsVisible})}
            >
              {props.wayPageSettings.isStatisticsVisible ?
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
            </div>
          </Tooltip>
        </HorizontalContainer>
        {/* // TODO: moved out statistics to WayPage because it's not a goal
         <WayStatistic
          dayReports={props.way.dayReports}
          wayCreatedAt={props.way.createdAt}
          isVisible={props.wayPageSettings.isStatisticsVisible}
        /> */}
      </div>
    </div>
  );
};
