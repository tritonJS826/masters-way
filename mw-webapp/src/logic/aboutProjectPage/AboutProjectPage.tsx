import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {LOGO_TEXT} from "src/component/header/Header";
import {Image} from "src/component/image/Image";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {LanguageService as LangService} from "src/service/LangauageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Theme} from "src/utils/ThemeWorker";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const {language, theme} = useGlobalContext();

  const accordionItems = LangService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.aboutBlock}>
          <Title
            level={HeadingLevel.h2}
            text={LangService.aboutProject.mainTitle[language]}
            className={styles.title}
          />
          <Title
            level={HeadingLevel.h3}
            text={LangService.aboutProject.mainSubTitle[language]}
            className={styles.title}
          />
          <div className={styles.aboutDescription}>
            <div className={styles.aboutTextBlock}>
              <div>
                {LangService.aboutProject.descriptionSubTitle[language]}
              </div>
              <Title
                level={HeadingLevel.h3}
                text={LangService.aboutProject.descriptionTitle[language]}
              />
              <div>
                {renderMarkdown(
                  LangService.aboutProject.descriptionList[language],
                )}
              </div>
            </div>
            <Image
              src={theme === Theme.DARK ? logoLight : logo}
              alt={LOGO_TEXT}
              className={styles.logoAbout}
            />
          </div>
        </div>

        <VerticalContainer className={styles.accordionSection}>
          <Title
            level={HeadingLevel.h2}
            text={LangService.aboutProject.accordionTitle[language]}
            className={styles.title}
          />

          <Accordion
            items={accordionItems}
            type={accordionTypes.multiple}
            className={styles.accordion}
          />
        </VerticalContainer>
      </div>
    </div>
  );
};
