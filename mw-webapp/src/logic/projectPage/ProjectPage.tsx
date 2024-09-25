import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ProjectDAL} from "src/dataAccessLogic/ProjectDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {ProjectPageStore} from "src/logic/projectPage/ProjectPageStore";
import {Project} from "src/model/businessModel/Project";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/projectPage/ProjectPage.module.scss";

const MAX_LENGTH_PROJECT_NAME = 50;
const MIN_LENGTH_PROJECT_NAME = 1;

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
  const {user} = userStore;
  const {language} = languageStore;
  const {theme} = themeStore;
  const navigate = useNavigate();

  const projectStore = useStore<
  new (projectUuid: string) => ProjectPageStore,
  [string], ProjectPageStore>({
      storeForInitialize: ProjectPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  const {project} = projectStore;

  /**
   * Delete project
   */
  const deleteProject = async (projectUuid: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }

    await ProjectDAL.deleteProject(projectUuid);
    navigate(pages.user.getPath({uuid: user.uuid}));
  };

  /**
   * Update project
   */
  const updateProject = async (projectToUpdate: PartialWithUuid<Project>) => {
    await ProjectDAL.updateProject(projectToUpdate);

  };

  if (!projectStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isOwner = !!user && user.uuid === project.ownerId;

  return (
    <VerticalContainer className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={project.name}
        placeholder=""
        onChangeFinish={async (name) => updateProject({
          uuid: project.uuid,
          name,
        },
        )}
        isEditable={isOwner}
        validators={[
          minLengthValidator(MIN_LENGTH_PROJECT_NAME, LanguageService.project.notifications.projectNameMinLength[language]),
          maxLengthValidator(MAX_LENGTH_PROJECT_NAME, LanguageService.project.notifications.projectNameMaxLength[language]),
        ]}
      />
      {isOwner &&
      <Confirm
        trigger={
          <Button
            onClick={() => {}}
            value={LanguageService.project.projectInfo.deleteProject[language]}
          />
        }
        content={<p>
          {`${LanguageService.project.projectInfo.deleteProjectModalQuestion[language]} "${project.name}"?`}
        </p>}
        onOk={() => deleteProject(project.uuid)}
        okText={LanguageService.modals.confirmModal.deleteButton[language]}
        cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
      />

      }
    </VerticalContainer>
  );
});
