import {observer} from "mobx-react-lite";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {getAllCollections} from "src/logic/userPage/UserPage";
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
  const {user} = userStore;

  return (
    <HorizontalContainer className={styles.goalSection}>
      <Title
        level={HeadingLevel.h3}
        text={LanguageService.way.wayInfo.goal[language]}
      />
      <EditableTextarea
        text={props.goalDescription}
        onChangeFinish={async (goalDescription) => {
          const allCollections = user && getAllCollections(user.defaultWayCollections, user.customWayCollections);

          allCollections?.map((collection) => {
            collection.updateWay({
              uuid: props.wayUuid,
              goalDescription,
            });
          });

          await props.updateWay({
            uuid: props.wayUuid,
            goalDescription,
          });
        }}
        rows={10}
        isEditable={props.isEditable}
        className={styles.goalDescription}
      />
    </HorizontalContainer>
  );
});
