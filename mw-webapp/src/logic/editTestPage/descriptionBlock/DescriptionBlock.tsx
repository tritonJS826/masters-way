import {observer} from "mobx-react-lite";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/trainingPage/descriptionBlock/DescriptionBlock.module.scss";

const MAX_TEST_DESCRIPTION_LENGTH = 4096;

/**
 * Description block props
 */
interface DescriptionBlockProps {

  /**
   * Test's description
   */
  description: string;

  /**
   * Callback to update description
   */
  updateTest: (description: string) => Promise<void>;

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
        <Infotip content={LanguageService.test.infotip.description[language]} />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.test.testInfo.description[language]}
          placeholder={LanguageService.common.emptyMarkdownAction[language]}
        />
      </HorizontalContainer>
      <EditableTextarea
        maxCharacterCount={MAX_TEST_DESCRIPTION_LENGTH}
        text={props.description}
        onChangeFinish={async (description) => {
          await props.updateTest(description);
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
