import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Logotype} from "src/component/logotype/Logotype";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {LanguageService as LangService} from "src/service/LangauageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 *TeamMemberType
 */
interface TeamMemberType {

  /**
   * Id member
   */
  id: number;

  /**
   * Name member
   */
  name: string;

  /**
   * Profession member
   */
  profession: string;

  /**
   * Image Url
   */
  imageUrl: string;
}

const teamMembers: TeamMemberType[] = [
  {
    id: 1,
    name: "Viktar Veratsennikau",
    profession: "Founder",
    imageUrl: "",
  },
  {
    id: 2,
    name: "Ekaterina Veretennikova",
    profession: "Team Leader",
    imageUrl: "",
  },
  {
    id: 3,
    name: "Sergei Aslanov",
    profession: "developer",
    imageUrl: "",
  },
  {
    id: 4,
    name: "Marat Assimbayev",
    profession: "developer",
    imageUrl: "",
  },
  {
    id: 5,
    name: "Alexandr Chorniy",
    profession: "developer",
    imageUrl: "",
  },
];

/**
 * About project page
 */
export const AboutProjectPage = () => {
  const {language} = useGlobalContext();

  const accordionItems = LangService.aboutProject.accordion.map((data) => ({
    trigger: {child: data.header[language]},
    content: {child: renderMarkdown(data.description[language])},
  }));

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.aboutBlock}>
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
          <Logotype
            className={styles.logoAbout}
            isColorSecondary
          />
        </div>
      </div>

      <div className={styles.ourTeamBlock}>
        <Title
          level={HeadingLevel.h2}
          text={LangService.aboutProject.AboutTeamTitle[language]}
        />

        <div className={styles.ourTeamMembers}>
          {teamMembers.map((member) => {
            return (
              <div
                key={member.id}
                className={styles.ourTeamMember}
              >
                <Avatar
                  alt={member.name}
                  src={member.imageUrl}
                  size={AvatarSize.LARGE}
                  className={styles.avatar}
                />
                <div>
                  {member.name}
                </div>
                <div>
                  {member.profession}
                </div>
              </div>
            );
          })}
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
  );
};
