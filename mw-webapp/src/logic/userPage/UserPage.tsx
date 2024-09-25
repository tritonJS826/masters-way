import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {observer} from "mobx-react-lite";
import {TrackUserPage} from "src/analytics/userPageAnalytics";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Form} from "src/component/form/Form";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {ProjectCard} from "src/component/projectCard/ProjectCard";
import {Tab, TabItemProps} from "src/component/tab/Tab";
import {Tag, TagType} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayCollectionCard} from "src/component/wayCollectionCard/WayCollectionCard";
import {ChatDAL, RoomType} from "src/dataAccessLogic/ChatDAL";
import {FavoriteUserDAL} from "src/dataAccessLogic/FavoriteUserDAL";
import {ProjectDAL} from "src/dataAccessLogic/ProjectDAL";
import {SurveyDAL, SurveyUserIntroParams} from "src/dataAccessLogic/SurveyDAL";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {UserTagDAL} from "src/dataAccessLogic/UserTagDAL";
import {WayCollectionDAL} from "src/dataAccessLogic/WayCollectionDAL";
import {deviceStore} from "src/globalStore/DeviceStore";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {useStore} from "src/hooks/useStore";
import {chatListStore} from "src/logic/chat/ChatListStore";
import {chatStore} from "src/logic/chat/ChatStore";
import {UserPageStore} from "src/logic/userPage/UserPageStore";
import {BaseWaysTable, FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {DefaultWayCollections, User, UserPlain, WayCollection} from "src/model/businessModel/User";
import {ProjectPreview} from "src/model/businessModelPreview/ProjectPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {UserPageSettings, View} from "src/utils/LocalStorageWorker";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {PartialWithId, PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/userPage/UserPage.module.scss";

const MAX_LENGTH_USERNAME = 50;
const MIN_LENGTH_USERNAME = 1;

/**
 * Get all collections
 */
export const getAllCollections = (defaultWayCollections: DefaultWayCollections, customWayCollections: WayCollection[]) => {
  const allWayCollections = [
    defaultWayCollections.own,
    defaultWayCollections.mentoring,
    defaultWayCollections.favorite,
    ...customWayCollections,
  ];

  return allWayCollections;
};

/**
 * Update User params
 */
export interface UpdateUserParams {

  /**
   * User to update
   */
  userToUpdate: PartialWithUuid<User>;

  /**
   * Callback to update user
   */
  setUser: (user: PartialWithUuid<User>) => void;
}

/**
 * Update user
 */
export const updateUser = async (params: UpdateUserParams) => {
  params.setUser(params.userToUpdate);
  await UserDAL.updateUser(params.userToUpdate);
};

/**
 * User Page Props
 */
interface UserPageProps {

  /**
   * User's uuid
   */
  uuid: string;
}

/**
 * Default ways collections
 */
enum DefaultCollections {
  OWN = "own",
  MENTORING = "mentoring",
  FAVORITE = "favorite",
}

const DEFAULT_USER_PAGE_SETTINGS: UserPageSettings = {
  filterStatus: FILTER_STATUS_ALL_VALUE,
  view: View.Card,
};

/**
 * Safe opened tab from localStorage
 */
const userPageSettingsValidator = (props: UserPageSettingsValidatorParams) => {
  const allWayCollections = getAllCollections(props.defaultWayCollections, props.customWayCollections);
  const isTabExist = props.openedTabId
    && allWayCollections.some(collection => collection.uuid === props.openedTabId);

  return !!isTabExist;
};

/**
 * Check is user in favorites
 */
const getIsUserInFavorites = (
  user: User | null,
  pageOwner: User,
) => ((user?.favoriteUsers ?? []).map(plainUser => plainUser.uuid)).includes(pageOwner.uuid);

/**
 * UserPageSettingsValidator params
 */
interface UserPageSettingsValidatorParams {

  /**
   * Opened collection ID
   */
  openedTabId: string;

  /**
   * CustomWayCollections
   */
  customWayCollections: WayCollection[];

  /**
   * DefaultWayCollections
   */
  defaultWayCollections: DefaultWayCollections;
}

/**
 * User page
 */
export const UserPage = observer((props: UserPageProps) => {
  const {user, addUserToFavorite, deleteUserFromFavorite} = userStore;
  const {setIsChatOpen} = chatStore;
  const {chatList} = chatListStore;
  const {deviceId, setDeviceId} = deviceStore;
  const navigate = useNavigate();

  const userPageStore = useStore<
  new (userPageOwnerUuid: string) => UserPageStore,
  [string], UserPageStore>({
      storeForInitialize: UserPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  const {language} = languageStore;
  const {theme} = themeStore;
  const [isAddUserTagModalOpen, setIsAddUserTagModalOpen] = useState(false);
  const {userPageOwner, addUserToFavoriteForUser, deleteUserFromFavoriteForUser} = userPageStore;
  const [projects, setProjects] = useState<ProjectPreview[]>([]);

  const [openedTabId, setOpenedTabId] = usePersistanceState({
    key: "userPage.openedTabId",
    defaultValue: DefaultCollections.OWN,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentValue: string,
    ) => userPageOwner
      ? userPageSettingsValidator({
        openedTabId: currentValue,
        customWayCollections: userPageOwner.customWayCollections,
        defaultWayCollections: userPageOwner.defaultWayCollections,
      })
      : true,
    dependencies: [userPageOwner],
  });
  const [userPageSettings,, updateUserPageSettings] = usePersistanceState({
    key: "userPage",
    defaultValue: DEFAULT_USER_PAGE_SETTINGS,
  });

  const isPageOwner = !!user && !!userPageOwner && user.uuid === userPageOwner.uuid;
  if (!userPageSettings || !userPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const allWayCollections = getAllCollections(
    userPageOwner.defaultWayCollections,
    userPageOwner.customWayCollections,
  );
  const currentCollection = allWayCollections.find((col) => col.uuid === openedTabId);
  const isCustomCollection = currentCollection
    && userPageOwner.customWayCollections.includes(currentCollection);
  const defaultCollection = userPageOwner.defaultWayCollections.own;
  const newCollectionName = LanguageService.user.collections.newCollection[language];
  const newProjectName = LanguageService.user.projects.newProject[language];

  if (!defaultCollection) {
    throw new Error("Default collection is not exist");
  }
  if (!currentCollection) {
    setOpenedTabId(defaultCollection.uuid);
  }

  /**
   * Create collection
   */
  const createCustomWayCollection = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const newWayCollection = await WayCollectionDAL.createWayCollection({
      ownerUuid: user.uuid,
      collectionName: newCollectionName,
    });

    user.addCollection(newWayCollection);
    userPageOwner.addCollection(newWayCollection);

    setOpenedTabId(newWayCollection.uuid);
  };

  /**
   * Create project
   */
  const createProject = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const newProject = await ProjectDAL.createProject({
      ownerId: user.uuid,
      name: newProjectName,
    });

    const updatedProjects = projects.concat(newProject);

    setProjects(updatedProjects);
  };

  /**
   * Delete custom way collection
   */
  const deleteCustomWayCollections = async (collectionId: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }

    await WayCollectionDAL.deleteWayCollection(collectionId);

    user.deleteCollection(collectionId);
    userPageOwner.deleteCollection(collectionId);

    setOpenedTabId(DefaultCollections.OWN);
  };

  /**
   * Update custom way collectionsUserPreview
   */
  const updateCustomWayCollection = async (wayCollectionToUpdate: PartialWithId<WayCollection>) => {

    await WayCollectionDAL.updateWayCollection({
      ownerUuid: userPageOwner.uuid,
      collectionUuid: wayCollectionToUpdate.id,
      collectionName: wayCollectionToUpdate.name ?? "",
    });

    setOpenedTabId(wayCollectionToUpdate.id);
  };

  if (!currentCollection) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const favoriteTooltipTextForLoggedUser = getIsUserInFavorites(user, userPageOwner)
    ? LanguageService.user.personalInfo.deleteFromFavoritesTooltip[language]
    : LanguageService.user.personalInfo.addToFavoritesTooltip[language];

  const favoriteTooltipText = !user
    ? LanguageService.user.personalInfo.favoriteAmountTooltip[language]
    : favoriteTooltipTextForLoggedUser;

  const notificationFavoriteUsers = getIsUserInFavorites(user, userPageOwner)
    ? LanguageService.user.notifications.userRemovedFromFavorites[language]
    : LanguageService.user.notifications.userAddedToFavorites[language];

  /**
   * Load user's projects
   */
  const loadUserProjects = async () => {
    const projectsPreview = await ProjectDAL.getProjectsByUserUuid(userPageOwner.uuid);
    setProjects(projectsPreview);
  };

  const tabList: TabItemProps[] = [
    {
      id: "0",
      tabTrigger: {
        id: "0",
        value: "Collections",
      },
      tabContent: {
        id: "0",
        value: (
          <VerticalContainer className={styles.tabsSectionContainer}>
            <VerticalContainer className={styles.collectionGroup}>
              <HorizontalContainer>
                <Infotip content={LanguageService.user.infotip.basicCollections[language]} />
                <Title
                  level={HeadingLevel.h2}
                  text={LanguageService.user.collections.defaultCollections[language]}
                  placeholder=""
                />
              </HorizontalContainer>
              <HorizontalContainer className={styles.tabsSection}>

                <WayCollectionCard
                  isActive={userPageOwner.defaultWayCollections.own.uuid === openedTabId}
                  collectionTitle={LanguageService.user.collections.own[language]}
                  collectionWaysAmount={userPageOwner.defaultWayCollections.own.ways.length}
                  onClick={() => setOpenedTabId(userPageOwner.defaultWayCollections.own.uuid)}
                  language={language}
                  dataCy={userWaysAccessIds.wayCollectionButtonsBlock.ownWayCollectionButton}
                />

                <WayCollectionCard
                  isActive={userPageOwner.defaultWayCollections.mentoring.uuid === openedTabId}
                  collectionTitle={LanguageService.user.collections.mentoring[language]}
                  collectionWaysAmount={userPageOwner.defaultWayCollections.mentoring.ways.length}
                  onClick={() => setOpenedTabId(userPageOwner.defaultWayCollections.mentoring.uuid)}
                  language={language}
                  dataCy={userWaysAccessIds.wayCollectionButtonsBlock.mentoringWayCollectionButton}
                />

                <WayCollectionCard
                  isActive={userPageOwner.defaultWayCollections.favorite.uuid === openedTabId}
                  collectionTitle={LanguageService.user.collections.favorite[language]}
                  collectionWaysAmount={userPageOwner.defaultWayCollections.favorite.ways.length}
                  onClick={() => setOpenedTabId(userPageOwner.defaultWayCollections.favorite.uuid)}
                  language={language}
                  dataCy={userWaysAccessIds.wayCollectionButtonsBlock.favoriteWayCollectionButton}
                />
              </HorizontalContainer>
            </VerticalContainer>

            <VerticalContainer className={styles.collectionGroup}>
              <HorizontalContainer>
                <Infotip content={LanguageService.user.infotip.customCollections[language]} />
                <Title
                  level={HeadingLevel.h2}
                  text={LanguageService.user.collections.customCollections[language]}
                  placeholder=""
                />
              </HorizontalContainer>

              <HorizontalContainer className={styles.tabsSection}>
                {userPageOwner.customWayCollections.map(collection => (
                  <WayCollectionCard
                    key={collection.uuid}
                    isActive={collection.uuid === openedTabId}
                    collectionTitle={collection.name}
                    collectionWaysAmount={collection.ways.length}
                    onClick={() => setOpenedTabId(collection.uuid)}
                    language={language}
                    isEditable={isPageOwner}
                    onTitleEdit={(name) => {
                      collection.updateWayCollectionName(name);
                      updateCustomWayCollection({id: openedTabId, name});
                    }}
                    onDelete={() => deleteCustomWayCollections(currentCollection.uuid)}
                  />
                ))}

                {isPageOwner && (
                  <Button
                    value={LanguageService.user.collections.addCollection[language]}
                    onClick={createCustomWayCollection}
                    buttonType={ButtonType.SECONDARY}
                    className={styles.collectionButton}
                  />
                )}

              </HorizontalContainer>
            </VerticalContainer>
          </VerticalContainer>
        ),
      },
      value: "Tab 1",
    },
    {
      id: "1",
      tabTrigger: {
        id: "1",
        value: "Projects",
      },
      tabContent: {
        id: "1",
        value: (
          <VerticalContainer className={styles.tabsSectionContainer}>
            <HorizontalContainer className={styles.tabsSection}>
              {projects.map(project => (
                <ProjectCard
                  key={project.uuid}
                  projectTitle={project.name}
                  projectType={project.isPrivate
                    ? LanguageService.user.projects.private[language]
                    : LanguageService.user.projects.public[language]
                  }
                  onClick={() => navigate(pages.project.getPath({uuid: project.uuid}))}
                  language={language}
                />
              ))}

              {isPageOwner && (
                <Button
                  value={LanguageService.user.projects.addProject[language]}
                  onClick={createProject}
                  buttonType={ButtonType.SECONDARY}
                  className={styles.collectionButton}
                />
              )}

            </HorizontalContainer>
          </VerticalContainer>),
      },
      value: "Tab 2",

      /**
       * Load user's projects
       */
      onCLick: () => {
        loadUserProjects();
      },
    },
  ];

  return (
    <VerticalContainer className={styles.pageLayout}>
      <VerticalContainer className={styles.userInfoBlock}>
        <HorizontalGridContainer className={styles.userMainInfoBlock}>
          <HorizontalContainer className={styles.userAboutBlock}>
            <VerticalContainer className={styles.AvatarWithConnectButton}>
              <Avatar
                alt={userPageOwner.name}
                src={userPageOwner.imageUrl}
                size={AvatarSize.LARGE}
              />
              {!isPageOwner &&
              <Button
                onClick={async () => {
                  const chatParticipantsIds = chatList.flatMap((chatPreview) =>
                    chatPreview.participantIds);

                  const isUserConnected = !!chatParticipantsIds.includes(userPageOwner.uuid);
                  !isUserConnected &&
                await ChatDAL.createRoom({
                  roomType: RoomType.PRIVATE,
                  userId: userPageOwner.uuid,
                });

                  setIsChatOpen(true);
                }}
                buttonType={ButtonType.SECONDARY}
                value={LanguageService.user.personalInfo.writeToConnectButton[language]}
                dataCy={userPersonalDataAccessIds.connectButton}
              />
              }
            </VerticalContainer>

            <VerticalContainer className={styles.nameEmailSection}>
              <HorizontalContainer className={styles.nameSection}>
                <HorizontalContainer>
                  <Infotip content={LanguageService.user.infotip.userName[language]} />

                  <Title
                    cy={
                      {
                        dataCyTitleContainer: userPersonalDataAccessIds.descriptionSection.nameDisplay,
                        dataCyInput: userPersonalDataAccessIds.descriptionSection.nameInput,
                      }
                    }
                    level={HeadingLevel.h2}
                    text={userPageOwner.name}
                    placeholder={LanguageService.common.emptyMarkdownAction[language]}
                    onChangeFinish={async (name) => updateUser({
                      userToUpdate: {
                        uuid: userPageOwner.uuid,
                        name,
                      },

                      /**
                       * Update user
                       */
                      setUser: () => {
                        user && user.updateName(name);
                        userPageOwner.updateName(name);
                      },
                    })}
                    isEditable={isPageOwner}
                    validators={[
                      minLengthValidator(MIN_LENGTH_USERNAME, LanguageService.user.notifications.userNameMinLength[language]),
                      maxLengthValidator(MAX_LENGTH_USERNAME, LanguageService.user.notifications.userNameMaxLength[language]),
                    ]}
                    className={styles.ownerName}

                  />
                </HorizontalContainer>

                <Tooltip
                  content={favoriteTooltipText}
                  position={PositionTooltip.LEFT}

                >
                  <Button
                    className={!user ? styles.disabled : ""}
                    value={`${getIsUserInFavorites(user, userPageOwner)
                      ? Symbols.STAR
                      : Symbols.OUTLINED_STAR
                    }${Symbols.NO_BREAK_SPACE}${userPageOwner.favoriteForUserUuids.length}`}
                    onClick={() => {
                      if (!user) {
                        return;
                      }
                      if (getIsUserInFavorites(user, userPageOwner)) {
                        FavoriteUserDAL.deleteFavoriteUser({
                          donorUserUuid: user.uuid,
                          acceptorUserUuid: userPageOwner.uuid,
                        });
                        deleteUserFromFavorite(userPageOwner.uuid);
                        deleteUserFromFavoriteForUser(user.uuid);
                      } else {
                        FavoriteUserDAL.createFavoriteUser({
                          donorUserUuid: user.uuid,
                          acceptorUserUuid: userPageOwner.uuid,
                        });

                        const newFavoriteUser = new UserPlain({...userPageOwner});
                        addUserToFavorite(newFavoriteUser);
                        addUserToFavoriteForUser(user.uuid);
                      }

                      displayNotification({
                        text: notificationFavoriteUsers,
                        type: NotificationType.INFO,
                      });
                    }}
                    buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                  />
                </Tooltip>

              </HorizontalContainer>

              <VerticalContainer className={styles.userDescriptionSection}>
                <HorizontalContainer>
                  <Infotip content={LanguageService.user.infotip.aboutUser[language]} />
                  <Title
                    level={HeadingLevel.h3}
                    text={LanguageService.user.personalInfo.about[language]}
                    placeholder=""
                  />
                </HorizontalContainer>
                <EditableTextarea
                  cy={
                    {
                      textArea: userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownInput,
                      trigger: userPersonalDataAccessIds.descriptionSection.aboutMeMarkdownDisplay,
                    }
                  }
                  text={userPageOwner.description}
                  onChangeFinish={(description) => updateUser({
                    userToUpdate: {
                      uuid: userPageOwner.uuid,
                      description,
                    },

                    /**
                     * Update user
                     */
                    setUser: () => {
                      user && user.updateDescription(description);
                      userPageOwner.updateDescription(description);
                    },
                  })}
                  isEditable={isPageOwner}
                  className={styles.userDescription}
                  placeholder={isPageOwner
                    ? LanguageService.common.emptyMarkdownAction[language]
                    : LanguageService.common.emptyMarkdown[language]}
                />

                <Title
                  level={HeadingLevel.h3}
                  text={LanguageService.user.personalInfo.email[language]}
                  className={styles.ownerEmail}
                  placeholder=""
                />
                <p>
                  {userPageOwner.email}
                </p>

              </VerticalContainer>

              <HorizontalContainer>
                <Infotip content={LanguageService.user.infotip.isMentor[language]} />
                <Checkbox
                  isDisabled={!isPageOwner}
                  isDefaultChecked={userPageOwner.isMentor}
                  onChange={(isMentor) => updateUser({
                    userToUpdate: {
                      uuid: userPageOwner.uuid,
                      isMentor,
                    },

                    /**
                     * Update user
                     */
                    setUser: () => {
                      user && user.updateIsMentor(isMentor);
                      userPageOwner.updateIsMentor(isMentor);
                    },
                  })}
                />
                <Tooltip content={LanguageService.user.personalInfo.becomeMentorTooltip[language]}>
                  <Title
                    level={HeadingLevel.h3}
                    text={LanguageService.user.personalInfo.mentor[language]}
                    placeholder=""
                  />
                </Tooltip>
              </HorizontalContainer>

            </VerticalContainer>
          </HorizontalContainer>

          <VerticalContainer className={styles.userSkillsAndSocialBlock}>
            <HorizontalContainer className={styles.skillsTitleBlock}>
              <HorizontalContainer>
                <Infotip content={LanguageService.user.infotip.skills[language]} />
                <Title
                  level={HeadingLevel.h2}
                  text={LanguageService.user.personalInfo.skills[language]}
                  placeholder=""
                />
              </HorizontalContainer>
              {isPageOwner && (
                <Modal
                  isOpen={isAddUserTagModalOpen}
                  trigger={
                    <Tooltip content={LanguageService.user.personalInfo.addSkills[language]}>
                      <Button
                        icon={
                          <Icon
                            size={IconSize.SMALL}
                            name="PlusIcon"
                          />
                        }
                        onClick={() => {}}
                        buttonType={ButtonType.ICON_BUTTON}
                        dataCy={userPersonalDataAccessIds.descriptionSection.addSkillButton}
                      />
                    </Tooltip>
                  }
                  content={
                    <PromptModalContent
                      cy={
                        {
                          dataCyInput: userPersonalDataAccessIds.userSkillsBlock.skillsModalContent.skillInput,
                          dataCyCreateButton: userPersonalDataAccessIds.userSkillsBlock.skillsModalContent.createSkillButton,
                        }
                      }
                      defaultValue=""
                      title={LanguageService.user.personalInfo.addSkillModalTitle[language]}
                      placeholder={LanguageService.user.personalInfo.addSkillModal[language]}
                      close={() => setIsAddUserTagModalOpen(false)}
                      onOk={async (tagName: string) => {
                        const isSkillDuplicate = user.tags.some((tag) => tag.name === tagName);
                        if (isSkillDuplicate) {
                          displayNotification({
                            text: `${LanguageService.user.personalInfo.duplicateSkillModal[language]}`,
                            type: NotificationType.INFO,
                          });
                        } else {
                          const newTag = await UserTagDAL.createUserTag({name: tagName, ownerUuid: user.uuid});
                          user.addTag(newTag);
                          userPageOwner.addTag(newTag);
                        }
                      }}
                      okButtonValue={LanguageService.user.personalInfo.addSkillModalButton[language]}
                      cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
                    />
                  }
                />
              )}
            </HorizontalContainer>
            <HorizontalContainer className={styles.userTagsContainer}>
              {userPageOwner?.tags.map(tag => (
                <Tag
                  cy={
                    {
                      dataCyTag: userPersonalDataAccessIds.userSkillsBlock.skillTag.tag,
                      dataCyCross: userPersonalDataAccessIds.userSkillsBlock.skillTag.removeTagButton,
                    }
                  }
                  tagName={tag.name}
                  key={tag.uuid}
                  isDeletable={isPageOwner}
                  type={TagType.PRIMARY_TAG}
                  removeTooltipText={LanguageService.common.removeTag[language]}
                  onDelete={async () => {
                    user && user.deleteTag(tag.uuid);
                    userPageOwner.deleteTag(tag.uuid);
                    await UserTagDAL.deleteUserTag({userTagId: tag.uuid, userId: userPageOwner.uuid});
                  }}
                />
              ))}
              {!userPageOwner?.tags.length && LanguageService.user.personalInfo.noSkills[language]}
            </HorizontalContainer>
            <HorizontalContainer className={styles.supportTitleBlock}>
              <HorizontalContainer>
                <Infotip content={LanguageService.user.infotip.support[language]} />
                <Title
                  level={HeadingLevel.h2}
                  text={LanguageService.user.personalInfo.support[language]}
                  placeholder=""
                />
              </HorizontalContainer>
            </HorizontalContainer>
            <HorizontalContainer className={styles.supportBlock}>
              {user &&
              <>
                <Modal
                  trigger={
                    <Button
                      onClick={TrackUserPage.trackDonateClick}
                      value={LanguageService.user.personalInfo.donateButton[language]}
                      icon={
                        <Icon
                          size={IconSize.SMALL}
                          name={"DollarIcon"}
                        />
                      }
                      buttonType={ButtonType.SECONDARY}
                    />
                  }
                  content={
                    <VerticalContainer>
                      {renderMarkdown(LanguageService.user.personalInfo.donateModal[language])}
                    </VerticalContainer>
                  }
                />
                <Button
                  onClick={() => {
                    TrackUserPage.trackUpgradeToPremiumClick;
                    navigate(pages.pricing.getPath({}));
                  }}
                  value={LanguageService.user.personalInfo.upgradeToPremiumButton[language]}
                  icon={
                    <Icon
                      size={IconSize.SMALL}
                      name={"AwardIcon"}
                    />
                  }
                  buttonType={ButtonType.SECONDARY}
                />
              </>
              }
            </HorizontalContainer>
          </VerticalContainer>

        </HorizontalGridContainer>
      </VerticalContainer>

      <Tab tabList={tabList} />

      <BaseWaysTable
        key={currentCollection.uuid}
        // This check need to translate default collections and don't translate custom collections
        title={currentCollection.name.toLowerCase() in LanguageService.user.collections
          ? LanguageService.user.collections[
          currentCollection.name.toLowerCase() as keyof typeof LanguageService.user.collections
          ][language]
          : currentCollection.name
        }
        ways={currentCollection.ways}
        updateCollection={isCustomCollection
          ? (wayCollection: Partial<WayCollection>) =>
            updateCustomWayCollection({id: currentCollection.uuid, ...wayCollection})
          : undefined
        }
        filterStatus={userPageSettings.filterStatus}
        setFilterStatus={(
          filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
        ) => updateUserPageSettings({filterStatus})}
        view={userPageSettings.view}
        setView={(view: View) => updateUserPageSettings({view})}
        isPageOwner={isPageOwner}
      />
      {isPageOwner && !deviceId &&
        <Modal
          cy={{dataCyContent: {dataCyOverlay: userPersonalDataAccessIds.surveyOverlay}}}
          isOpen={true}
          close={() => {
            const generatedDeviceId = uuidv4();
            setDeviceId(generatedDeviceId);
          }
          }
          trigger={<></>}
          content={
            <VerticalContainer className={styles.modalContainer}>
              <Form
                onSubmit={async (formData: Omit<SurveyUserIntroParams, "deviceId">) => {
                  const generatedDeviceId = uuidv4();
                  setDeviceId(generatedDeviceId);
                  await SurveyDAL.surveyUserIntro({
                    deviceId: generatedDeviceId,
                    ...formData,
                  });
                }}
                submitButtonValue={LanguageService.survey.submitButton[language]}
                formTitle={LanguageService.survey.cohortAnalysis.title[language]}
                formDescription={LanguageService.survey.cohortAnalysis.description[language]}
                formFields={[
                  {
                    id: 0,
                    label: "preferredInterfaceLanguage",
                    name: `${LanguageService.survey.cohortAnalysis.fields.interfaceLanguage.name[language]}`,
                    value: "",
                    required: true,
                    placeholder: `${LanguageService.survey.cohortAnalysis.fields.interfaceLanguage.placeholder[language]}`,
                  },
                  {
                    id: 1,
                    label: "role",
                    name: `${LanguageService.survey.cohortAnalysis.fields.role.name[language]}`,
                    value: "",
                    required: true,
                    placeholder: `${LanguageService.survey.cohortAnalysis.fields.role.placeholder[language]}`,
                  },
                  {
                    id: 2,
                    label: "source",
                    name: `${LanguageService.survey.cohortAnalysis.fields.source.name[language]}`,
                    value: "",
                    required: true,
                    placeholder: `${LanguageService.survey.cohortAnalysis.fields.source.placeholder[language]}`,
                  },
                  {
                    id: 3,
                    label: "studentExperience",
                    name: `${LanguageService.survey.cohortAnalysis.fields.studentExperience.name[language]}`,
                    value: "",
                    required: true,
                    placeholder: `${LanguageService.survey.cohortAnalysis.fields.studentExperience.placeholder[language]}`,
                  },
                  {
                    id: 4,
                    label: "studentGoals",
                    name: `${LanguageService.survey.cohortAnalysis.fields.studentGoals.name[language]}`,
                    value: "",
                    required: true,
                    placeholder: `${LanguageService.survey.cohortAnalysis.fields.studentGoals.placeholder[language]}`,
                  },
                  {
                    id: 5,
                    label: "whyRegistered",
                    name: `${LanguageService.survey.cohortAnalysis.fields.whyRegistered.name[language]}`,
                    value: "",
                    required: true,
                    placeholder: `${LanguageService.survey.cohortAnalysis.fields.whyRegistered.placeholder[language]}`,
                  },
                ]}
              />
            </VerticalContainer>
          }
        />
      }
    </VerticalContainer>
  );
});
