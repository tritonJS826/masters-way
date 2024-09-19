import {settingsAccessIds} from "cypress/accessIds/settingsAccessIds";
import {observer} from "mobx-react-lite";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/logic/projectPage/ProjectPage.module.scss";

/**
 * PageProps
 */
interface ProjectPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * Project page
 */
export const ProjectPage = observer((props: ProjectPageProps) => {
  return (
    <VerticalContainer className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={`Project page ${props.uuid}`}
        placeholder=""
        cy={{dataCyTitleContainer: settingsAccessIds.title}}
      />
    </VerticalContainer>
  );
});
