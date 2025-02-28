import {wayDescriptionAccessIds} from "cypress/accessIds/wayDescriptionAccessIds";
import {observer} from "mobx-react-lite";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {getAllCollections} from "src/logic/userPage/DefaultTrainingCollection";
import {LanguageService} from "src/service/LanguageService";
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
  updateWay: (goalDescription: string) => Promise<void>;

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
    <VerticalContainer className={styles.goalSection}>
      <HorizontalContainer>
        <Infotip content={LanguageService.way.infotip.goal[language]} />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.way.wayInfo.goal[language]}
          placeholder={LanguageService.common.emptyMarkdownAction[language]}
        />
      </HorizontalContainer>
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

          await props.updateWay(goalDescription);
        }}
        rows={10}
        isEditable={props.isEditable}
        className={styles.goalDescription}
        placeholder={props.isEditable
          ? LanguageService.common.emptyMarkdownAction[language]
          : LanguageService.common.emptyMarkdown[language]}
        cy={
          {
            textArea: "",
            trigger: wayDescriptionAccessIds.wayDashBoardLeft.goal,
          }
        }
      />
    </VerticalContainer>
  );
});
