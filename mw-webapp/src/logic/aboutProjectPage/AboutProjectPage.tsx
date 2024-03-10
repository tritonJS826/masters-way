// Import {useEffect, useState} from "react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {HeadingLevel, Title} from "src/component/title/Title";
// Import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {LanguageService as LangService} from "src/service/LangauageService";
// Import {UserServiceU} from "src/serviceUpdated/UserService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const {language} = useGlobalContext();

  // Const [x, setX] = useState();

  // /**
  //  * Sdf
  //  */
  // const loadX = async () => {
  //   const data = await UserServiceU.getAllUsers();
  //   setX(data);
  // };

  // useEffect(() => {
  //   loadX();
  // }, []);

  // // eslint-disable-next-line no-console
  // console.log(x);

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
