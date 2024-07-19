import {aboutProjectAccessIds} from "cypress/accessIds/aboutProjectAccessIds";
import {observer} from "mobx-react-lite";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Footer} from "src/component/footer/Footer";
import {LOGO_TEXT} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Image} from "src/component/image/Image";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {TeamMember} from "src/logic/aboutProjectPage/TeamMember/TeamMember";
import {teamMembers} from "src/logic/aboutProjectPage/TeamMember/teamMembers";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * About project page
 */
export const AboutProjectPage = observer(() => {
  const {language} = languageStore;

  const accordionItems = LanguageService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

  return (
    <>
      <VerticalContainer className={styles.aboutBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.aboutProject.mainTitle[language]}
          className={styles.title}
          placeholder=""
          cy={{dataCyTitleContainer: aboutProjectAccessIds.aboutBlock.title}}
        />
        <Title
          level={HeadingLevel.h3}
          text={LanguageService.aboutProject.mainSubTitle[language]}
          className={styles.subtitle}
          placeholder=""
        />
        <HorizontalContainer className={styles.aboutDescription}>
          <VerticalContainer className={styles.aboutTextBlock}>
            <div>
              {LanguageService.aboutProject.descriptionSubTitle[language]}
            </div>
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.aboutProject.descriptionTitle[language]}
              placeholder=""
            />
            <div>
              {renderMarkdown(
                LanguageService.aboutProject.descriptionList[language],
              )}
            </div>
          </VerticalContainer>
          <Image
            alt={LOGO_TEXT}
            src={logoLight}
            className={styles.logoAbout}
          />
        </HorizontalContainer>
      </VerticalContainer>

      <VerticalContainer className={styles.ourTeamBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.aboutProject.AboutTeamTitle[language]}
          placeholder=""
        />

        <HorizontalContainer className={styles.ourTeamMembers}>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.id}
              member={member}
            />
          ))}
        </HorizontalContainer>
      </VerticalContainer>

      <VerticalContainer className={styles.accordionSection}>
        <Title
          level={HeadingLevel.h2}
          text={LanguageService.aboutProject.accordionTitle[language]}
          className={styles.title}
          placeholder=""
        />

        <Accordion
          items={accordionItems}
          type={accordionTypes.multiple}
          className={styles.accordion}
        />
      </VerticalContainer>

      <Footer language={language} />
    </>
  );
});
