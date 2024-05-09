import {observer} from "mobx-react-lite";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {languageStore} from "src/globalStore/LanguageStore";
import {Way} from "src/model/businessModel/Way";
import {LanguageService} from "src/service/LanguageService";
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
export const GoalBlock = observer((props: GoalBlockProps) => {
  const {language} = languageStore;

  return (
    <HorizontalContainer className={styles.goalSection}>
      <Title
        level={HeadingLevel.h3}
        text={LanguageService.way.wayInfo.goal[language]}
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
    </HorizontalContainer>
  );
});
