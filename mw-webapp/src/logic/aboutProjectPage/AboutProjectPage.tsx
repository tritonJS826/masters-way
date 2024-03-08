import {useContext} from "react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {HeadingLevel, Title} from "src/component/title/Title";
import {globalContext} from "src/GlobalContext";
import {LanguageService as LangService} from "src/service/LangauageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const {language} = useContext(globalContext);

  const accordionItems = LangService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

  return (
    <div className={styles.pageWrapper}>
      <Title
        level={HeadingLevel.h2}
        text={LangService.aboutProject.mainTitle[language]}
      />

      <div className={styles.projectDescription}>
        {renderMarkdown(LangService.aboutProject.projectDescription[language])}
      </div>

      <Title
        level={HeadingLevel.h2}
        text={LangService.aboutProject.accordionTitle[language]}
      />

      <Accordion
        items={accordionItems}
        type={accordionTypes.multiple}
        className={styles.accordion}
      />
    </div>
  );
};
