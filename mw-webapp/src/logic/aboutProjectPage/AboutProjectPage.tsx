import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {HeadingLevel, Title} from "src/component/title/Title";
import aboutProjectPageContent from "src/logic/aboutProjectPage/AboutProjectPageContent.json";
import {Language, LanguageWorker} from "src/utils/LanguageWorker";
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
  // TODO: don't use as
  const lang = LanguageWorker.getCurrentLanguage() as Language ?? Language.ENGLISH;

  const accordionItems = accordionContent.map((data) => ({
    trigger: {child: data.header[lang]},
    content: {child: renderMarkdown(data.description[lang])},
  }));

  return (
    <div className={styles.pageWrapper}>
      <Title
        level={HeadingLevel.h2}
        text="About project"
      />

      <div className={styles.projectDescription}>
        {renderMarkdown(projectDescriptionContent[lang])}
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
