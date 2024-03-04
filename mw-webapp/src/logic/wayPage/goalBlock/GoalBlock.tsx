import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Way} from "src/model/businessModel/Way";
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
   * Way uuid
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

}

/**
 * Goal block
 */
export const GoalBlock = (props: GoalBlockProps) => {

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
    </div>
  );
};
