import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ProjectDAL} from "src/dataAccessLogic/ProjectDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {useStore} from "src/hooks/useStore";
import {ProjectPageStore} from "src/logic/projectPage/ProjectPageStore";
import {BaseWaysTable, FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {Project} from "src/model/businessModel/Project";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {ProjectPageSettings, View} from "src/utils/LocalStorageWorker";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/projectPage/ProjectPage.module.scss";

const MAX_LENGTH_PROJECT_NAME = 50;
const MIN_LENGTH_PROJECT_NAME = 1;

const DEFAULT_PROJECT_PAGE_SETTINGS: ProjectPageSettings = {
  filterStatus: FILTER_STATUS_ALL_VALUE,
  view: View.Card,
};

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

  const [projectPageSettings,, updateProjectPageSettings] = usePersistanceState({
    key: "projectPage",
    defaultValue: DEFAULT_PROJECT_PAGE_SETTINGS,
  });

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
    <VerticalContainer className={styles.pageLayout}>
      <VerticalContainer className={styles.projectInfoBlock}>
        <HorizontalContainer className={styles.projectTitleActions}>
          <VerticalContainer>
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
            {project.isPrivate
              ? LanguageService.project.projectPrivacy.private[language]
              : LanguageService.project.projectPrivacy.public[language]
            }
          </VerticalContainer>
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
        </HorizontalContainer>

        <VerticalContainer className={styles.participantsBlock}>
          <Title
            level={HeadingLevel.h3}
            text={LanguageService.project.tabs.participants[language]}
            placeholder=""
          />
          <HorizontalContainer className={styles.participants}>
            {project.users.map((participant) => (
              <VerticalContainer key={participant.uuid}>
                <Tooltip
                  position={PositionTooltip.BOTTOM}
                  content={
                    <HorizontalContainer className={styles.participant}>
                      <Avatar
                        alt={participant.name}
                        src={participant.imageUrl}
                        size={AvatarSize.BIG}
                      />
                      <VerticalContainer className={styles.participantInfo}>
                        <Title
                          level={HeadingLevel.h3}
                          text={participant.name}
                          placeholder=""
                        />
                        <p className={styles.participantDescription}>
                          {participant.description}
                        </p>
                      </VerticalContainer>
                    </HorizontalContainer>
                  }
                >
                  <Link
                    path={pages.user.getPath({uuid: participant.uuid})}
                    className={styles.user}
                  >
                    <Avatar
                      alt={participant.name}
                      src={participant.imageUrl}
                      size={AvatarSize.MEDIUM}
                      className={styles.avatar}
                    />
                  </Link>
                </Tooltip>
              </VerticalContainer>

            ))}
          </HorizontalContainer>

        </VerticalContainer>

      </VerticalContainer>

      <BaseWaysTable
        title={LanguageService.project.waysOfProject[language]}
        ways={project.ways}
        filterStatus={projectPageSettings.filterStatus}
        setFilterStatus={(
          filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
        ) => updateProjectPageSettings({filterStatus})}
        view={projectPageSettings.view}
        setView={(view: View) => updateProjectPageSettings({view})}
        isPageOwner={isOwner}
        projectUuid={project.uuid}
      />

    </VerticalContainer>
  );
});
