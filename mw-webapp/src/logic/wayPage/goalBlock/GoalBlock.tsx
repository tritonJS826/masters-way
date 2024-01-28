import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {useGlobalContext} from "src/GlobalContext";
import {GoalMetricsBlock} from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock";
import {WayStatistic} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {Way} from "src/model/businessModel/Way";
import {WayPageSettings} from "src/utils/LocalStorage";
import styles from "src/logic/wayPage/goalBlock/GoalBlock.module.scss";

/**
 * Goal block props
 */
interface GoalBlockProps {

  /**
   * Way
   */
  way: Way;

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
  const {user} = useGlobalContext();
  const isOwner = !!user && user.uuid === props.way.owner.uuid;

  return (
    <div className={styles.goalSection}>
      <div className={styles.goalSubSection}>
        <Title
          level={HeadingLevel.h3}
          text="Goal"
        />
        <EditableTextarea
          text={props.way.goal.description}
          onChangeFinish={async (description) => await GoalDAL.updateGoal({uuid: props.way.goal.uuid, description})
          }
          rows={10}
          isEditable={isOwner}
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
          way={props.way}
          isEditable={isOwner}
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
        <WayStatistic
          dayReports={props.way.dayReports}
          wayCreatedAt={props.way.createdAt}
          isVisible={props.wayPageSettings.isStatisticsVisible}
        />
      </div>
    </div>
  );
};
