import {observer} from "mobx-react-lite";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/trainingPage/descriptionBlock/DescriptionBlock.module.scss";

/**
 * Description block props
 */
interface DescriptionBlockProps {

  /**
   * Training's description
   */
  description: string;

  /**
   * Callback to update description
   */
  updateTraining: (description: string) => Promise<void>;

  /**
   * Is editable
   */
  isEditable: boolean;

}

/**
 * Description block
 */
export const DescriptionBlock = observer((props: DescriptionBlockProps) => {
  const {language} = languageStore;

  return (
    <VerticalContainer className={styles.descriptionSection}>
      <HorizontalContainer>
        <Infotip content={LanguageService.training.infotip.description[language]} />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.training.trainingInfo.description[language]}
          placeholder={LanguageService.common.emptyMarkdownAction[language]}
        />
      </HorizontalContainer>
      <EditableTextarea
        text={props.description}
        onChangeFinish={async (description) => {
          await props.updateTraining(description);
        }}
        rows={10}
        isEditable={props.isEditable}
        className={styles.description}
        placeholder={props.isEditable
          ? LanguageService.common.emptyMarkdownAction[language]
          : LanguageService.common.emptyMarkdown[language]}
      />
    </VerticalContainer>
  );
});
