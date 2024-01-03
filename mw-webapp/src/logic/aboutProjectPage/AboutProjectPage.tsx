import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {HeadingLevel, Title} from "src/component/title/Title";
import aboutProjectPageContent from "src/logic/aboutProjectPage/AboutProjectPageContent.json";
import {DEFAULT_LANGUAGE, LanguageWorker} from "src/utils/LanguageWorker";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * TODO: it's just an example, we should implement normal multi-lang service
 */
const {
  accordion: accordionContent,
  projectDescriotion: projectDescriptionContent,
} = aboutProjectPageContent;

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const currentLanguage = LanguageWorker.getCurrentLanguage() ?? DEFAULT_LANGUAGE;

  const accordionItems = accordionContent.map((data) => ({
    trigger: {child: data.header[currentLanguage]},
    content: {child: renderMarkdown(data.description[currentLanguage])},
  }));

  return (
    <div className={styles.pageWrapper}>
      <Title
        level={HeadingLevel.h2}
        text="About project"
      />

      <div className={styles.projectDescription}>
        {renderMarkdown(projectDescriptionContent[currentLanguage])}
      </div>

      <Title
        level={HeadingLevel.h2}
        text="FAQ"
      />

      <Accordion
        items={accordionItems}
        type={accordionTypes.multiple}
        className={styles.accordion}
      />
    </div>
  );
};
