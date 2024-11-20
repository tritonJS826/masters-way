import {projectsAccessIds} from "cypress/accessIds/projectsAccessIds";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import styles from "src/component/projectCard/ProjectCard.module.scss";

/**
 * Project props
 */
interface ProjectProps {

  /**
   * Collection title
   */
  projectTitle: string;

  /**
   * Is project private or public
   */
  projectType: string;

  /**
   * Callback triggered on WayCollection click
   */
  onClick: () => void;

  /**
   * Actual language
   */
  language: Language;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

}

/**
 * Project component
 */
export const ProjectCard = (props: ProjectProps) => {
  return (
    <Button
      onClick={props.onClick}
      className={styles.projectButton}
      value={
        <VerticalContainer className={styles.projectCardContainer}>
          <VerticalContainer className={styles.mainInfo}>
            <HorizontalContainer className={styles.projectTitleBlock}>
              <Title
                level={HeadingLevel.h3}
                text={props.projectTitle}
                className={styles.title}
                placeholder=""
                cy={{dataCyTitleContainer: projectsAccessIds.projectTitle}}
              />
            </HorizontalContainer>
          </VerticalContainer>
          <HorizontalContainer
            className={styles.additionalInfo}
            dataCy={projectsAccessIds.projectStatus}
          >
            {props.projectType}
          </HorizontalContainer>
        </VerticalContainer>
      }
      dataCy={props.dataCy}
    />
  );
};

