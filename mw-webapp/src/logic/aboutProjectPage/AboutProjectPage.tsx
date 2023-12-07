import {useState} from "react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import aboutProjectPageContent from "src/logic/aboutProjectPage/AboutProjectPageContent.json";
import {renderMarkdown} from "src/utils/textUtils/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * TODO: it's just an example, we should implement normal multi-lang service
 */
const {
  accordion: accordionContent,
  projectDescriotion: projectDescriptionContent,
} = aboutProjectPageContent;

/**
 * TODO: it's just an example, we should implement normal multi-lang service
 */
type Lang = "ru" | "en"

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const [lang, setLang] = useState<Lang>("en");

  const accordionItems = accordionContent.map((data) => ({
    trigger: {child: data.header[lang]},
    content: {child: renderMarkdown(data.description[lang])},
  }));

  return (
    <div className={styles.pageWrapper}>
      <Title
        level={HeadingLevel.h2}
        text="About project page"
      />

      <Button
        value={lang === "en" ? "change on ru" : "change on en"}
        onClick={() => setLang(lang === "en" ? "ru" : "en")}
      />

      <div className={styles.projectDescription}>
        {renderMarkdown(projectDescriptionContent[lang])}
      </div>

      <Title
        level={HeadingLevel.h3}
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
