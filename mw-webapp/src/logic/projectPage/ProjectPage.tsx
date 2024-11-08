import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
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
 * Update Project params
 */
interface UpdateProjectParams {

  /**
   * Project to update
   */
  projectToUpdate: PartialWithUuid<Project>;

  /**
   * Callback to update project
   */
  setProject: (project: PartialWithUuid<Project>) => void;
}

/**
 * Update Project
 */
const updateProject = async (params: UpdateProjectParams) => {
  params.setProject(params.projectToUpdate);
  await ProjectDAL.updateProject(params.projectToUpdate);
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
  const deleteProject = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }

    await ProjectDAL.deleteProject(project.uuid);
    user.deleteProject(project.uuid);
    navigate(pages.user.getPath({uuid: user.uuid}));
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

  const renderDeleteProjectDropdownItem = (
    <Confirm
      trigger={<>
        {LanguageService.project.projectInfo.deleteProject[language]}
      </>}
      content={<p>
        {`${LanguageService.project.projectInfo.deleteProjectModalQuestion[language]} "${project.name}"?`}
      </p>}
      onOk={deleteProject}
      okText={LanguageService.modals.confirmModal.deleteButton[language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
    />);

  return (
    <VerticalContainer className={styles.pageLayout}>
      <VerticalContainer className={styles.projectInfoBlock}>
        <HorizontalContainer className={styles.projectTitleActions}>
          <VerticalContainer>
            <Title
              level={HeadingLevel.h2}
              text={project.name}
              placeholder=""
              onChangeFinish={(name) => {
                project.updateName(name);
                userStore.updateProjectName(project.uuid, name);
                updateProject({
                  projectToUpdate: {
                    uuid: project.uuid,
                    name,
                  },

                  /**
                   * Update project's name
                   */
                  setProject: () => project.updateName(name),
                });
              }}
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
          <Dropdown
            contentClassName={styles.wayActionMenu}
            trigger={(
              <Tooltip
                content={LanguageService.project.projectInfo.projectActionsTooltip[language]}
                position={PositionTooltip.LEFT}
              >
                <Button
                  className={styles.projectActionsIcon}
                  buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                  onClick={() => {}}
                  icon={
                    <Icon
                      size={IconSize.MEDIUM}
                      name={"MoreVertical"}
                    />
                  }
                />
              </Tooltip>
            )}
            dropdownMenuItems={[
              {
                dropdownSubMenuItems: [
                  {
                    id: "Make the project private/public",
                    isPreventDefaultUsed: false,
                    isVisible: isOwner,
                    value: project.isPrivate
                      ? LanguageService.project.projectInfo.makePublicButton[language]
                      : LanguageService.project.projectInfo.makePrivateButton[language],

                    /**
                     * Toggle way privacy
                     */
                    onClick: () => updateProject({
                      projectToUpdate: {
                        uuid: project.uuid,
                        isPrivate: !project.isPrivate,
                      },

                      /**
                       * Update isPrivate property
                       */
                      setProject: () => project.updateIsPrivate(!project.isPrivate),
                    }),
                  },
                  {
                    id: "Delete the project",
                    isPreventDefaultUsed: true,
                    value: renderDeleteProjectDropdownItem,
                    isVisible: isOwner,
                  },
                ],
              },
            ]}
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
