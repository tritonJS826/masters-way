import logoLight from "src/assets/mastersWayLogoLight.svg";
import logoPurple from "src/assets/mastersWayLogoPurple.svg";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {LOGO_TEXT} from "src/component/header/Header";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {TeamMember, teamMembers} from "src/logic/aboutProjectPage/TeamMember/TeamMember";
import {LanguageService as LangService} from "src/service/LangauageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
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
    <VerticalContainer className={styles.pageWrapper}>
      <VerticalContainer className={styles.aboutBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LangService.aboutProject.mainTitle[language]}
          className={styles.title}
        />
        <Title
          level={HeadingLevel.h3}
          text={LangService.aboutProject.mainSubTitle[language]}
          className={styles.subtitle}
        />
        <div className={styles.aboutDescription}>
          <VerticalContainer className={styles.aboutTextBlock}>
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
          </VerticalContainer>
          <ThemedImage
            className={styles.logoAbout}
            sources={getMapThemeSources(logoPurple, logoLight)}
            theme={theme}
            name={LOGO_TEXT}
          />
        </div>
      </VerticalContainer>

      <VerticalContainer className={styles.ourTeamBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LangService.aboutProject.AboutTeamTitle[language]}
        />

        <div className={styles.ourTeamMembers}>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
            />
          ))}
        </div>
      </VerticalContainer>

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
    </VerticalContainer>
  );
};
