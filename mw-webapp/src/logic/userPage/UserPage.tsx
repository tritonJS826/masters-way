import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification} from "src/component/notification/displayNotification";
import {Tag} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayCollectionCard} from "src/component/wayCollectionCard/WayCollectionCard";
import {FavoriteUserDAL} from "src/dataAccessLogic/FavoriteUserDAL";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {UserTagDAL} from "src/dataAccessLogic/UserTagDAL";
import {WayCollectionDAL} from "src/dataAccessLogic/WayCollectionDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {UserPageStore} from "src/logic/userPage/UserPageStore";
import {useStore} from "src/logic/userPage/useStore";
import {BaseWaysTable, FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {DefaultWayCollections, User, UserPlain, WayCollection} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {UserPageSettings, View} from "src/utils/LocalStorageWorker";
import {PartialWithId, PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/userPage/UserPage.module.scss";

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

  const userPageStore = useStore<
  new (userPageOwnerUuid: string) => UserPageStore,
  [string], UserPageStore>({
      storeForInitialize: UserPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  const {language} = languageStore;
  const {theme} = themeStore;
  const [isRenameCollectionModalOpen, setIsRenameCollectionModalOpen] = useState(false);
  const [isAddUserTagModalOpen, setIsAddUserTagModalOpen] = useState(false);
  const {userPageOwner, addUserToFavoriteForUser, deleteUserFromFavoriteForUser} = userPageStore;

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

  const navigate = useNavigate();

  const isPageOwner = !!user && !!userPageOwner && user.uuid === userPageOwner.uuid;
  if (!userPageSettings || !userPageStore.isInitialized) {
    return (
      <Loader theme={theme} />
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

  if (!defaultCollection) {
    throw new Error("Default collection is not exist");
  }
  if (!currentCollection) {
    setOpenedTabId(defaultCollection.uuid);
  }

  /**
   * Create way
   */
  const createWay = async (owner: User) => {
    if (!user) {
      throw new Error("User is not defined");
    }
    const newWay: WayPreview = await WayDAL.createWay(owner);
    user.defaultWayCollections.own.addWay(newWay);
    navigate(pages.way.getPath({uuid: newWay.uuid}));
  };

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
    if (!user) {
      throw new Error("User is not defined");
    }

    const updatedCustomWayCollections = user.customWayCollections
      .map(collection => {
        if (collection.uuid === wayCollectionToUpdate.id) {
          return new WayCollection({...collection, ...wayCollectionToUpdate});
        } else {
          return collection;
        }
      });

    await WayCollectionDAL.updateWayCollection({
      ownerUuid: userPageOwner.uuid,
      collectionUuid: wayCollectionToUpdate.id,
      collectionName: wayCollectionToUpdate.name ?? "",
    });
    user.updateCollection(updatedCustomWayCollections);
    userPageOwner.updateCollection(updatedCustomWayCollections);

    setOpenedTabId(wayCollectionToUpdate.id);
  };

  if (!currentCollection) {
    return (
      <>
        <Loader theme={theme} />
        No collection
      </>
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

  return (
    <VerticalContainer className={styles.pageLayout}>
      <HorizontalGridContainer className={styles.container}>
        <VerticalContainer className={styles.descriptionSection}>
          <VerticalContainer className={styles.nameEmailSection}>
            <HorizontalContainer className={styles.nameSection}>
              <Title
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
                className={styles.ownerName}
              />
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
                      type: "info",
                    });
                  }}
                  buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                />
              </Tooltip>

            </HorizontalContainer>
            <Title
              level={HeadingLevel.h3}
              text={userPageOwner.email}
              classNameHeading={styles.ownerEmail}
              placeholder=""
            />

            <HorizontalContainer className={styles.mentoringStatusBlock}>
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
                className={styles.checkbox}
              />
              <Tooltip
                content={LanguageService.user.personalInfo.becomeMentorTooltip[language]}
                className={styles.tooltip}
                isInactive={!isPageOwner}
              >
                {LanguageService.user.personalInfo.mentor[language]}
              </Tooltip>
            </HorizontalContainer>

            <HorizontalContainer className={styles.userTagsContainer}>
              {userPageOwner?.tags.map(tag => (
                <Tag
                  tagName={tag.name}
                  key={tag.uuid}
                  isDeletable={isPageOwner}
                  onDelete={async () => {
                    user && user.deleteTag(tag.uuid);
                    userPageOwner.deleteTag(tag.uuid);
                    await UserTagDAL.deleteUserTag({userTagId: tag.uuid, userId: userPageOwner.uuid});
                  }}
                />
              ))}
              {!userPageOwner?.tags.length && LanguageService.way.wayInfo.noTags[language]}
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
                      />
                    </Tooltip>
                  }
                  content={
                    <PromptModalContent
                      defaultValue=""
                      placeholder={LanguageService.user.personalInfo.addSkillModal[language]}
                      close={() => setIsAddUserTagModalOpen(false)}
                      onOk={async (tagName: string) => {
                        const isSkillDuplicate = user.tags.some((tag) => tag.name === tagName);
                        if (isSkillDuplicate) {
                          displayNotification({
                            text: `${LanguageService.user.personalInfo.duplicateSkillModal[language]}`,
                            type: "info",
                          });
                        } else {
                          const newTag = await UserTagDAL.createUserTag({name: tagName, ownerUuid: user.uuid});
                          user.addTag(newTag);
                          userPageOwner.addTag(newTag);
                        }
                      }}
                      okButtonValue={LanguageService.modals.promptModal.okButton[language]}
                      cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
                    />
                  }
                />
              )}
            </HorizontalContainer>
          </VerticalContainer>

          <VerticalContainer className={styles.userDescriptionSection}>
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.user.personalInfo.about[language]}
              placeholder=""
            />
            <EditableTextarea
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
          </VerticalContainer>

          {isPageOwner &&
            <Button
              value={LanguageService.user.personalInfo.createNewWayButton[language]}
              onClick={() => createWay(user)}
              buttonType={ButtonType.PRIMARY}
            />
          }
        </VerticalContainer>

        <VerticalContainer className={styles.tabsSectionContainer}>
          <VerticalContainer className={styles.collectionGroup}>
            <Title
              level={HeadingLevel.h2}
              text={LanguageService.user.collections.defaultCollections[language]}
              placeholder=""
            />
            <HorizontalContainer className={styles.tabsSection}>

              <WayCollectionCard
                isActive={userPageOwner.defaultWayCollections.own.uuid === openedTabId}
                collectionTitle={LanguageService.user.collections.own[language]}
                collectionWaysAmount={userPageOwner.defaultWayCollections.own.ways.length}
                onClick={() => setOpenedTabId(userPageOwner.defaultWayCollections.own.uuid)}
                language={language}
              />

              <WayCollectionCard
                isActive={userPageOwner.defaultWayCollections.mentoring.uuid === openedTabId}
                collectionTitle={LanguageService.user.collections.mentoring[language]}
                collectionWaysAmount={userPageOwner.defaultWayCollections.mentoring.ways.length}
                onClick={() => setOpenedTabId(userPageOwner.defaultWayCollections.mentoring.uuid)}
                language={language}
              />

              <WayCollectionCard
                isActive={userPageOwner.defaultWayCollections.favorite.uuid === openedTabId}
                collectionTitle={LanguageService.user.collections.favorite[language]}
                collectionWaysAmount={userPageOwner.defaultWayCollections.favorite.ways.length}
                onClick={() => setOpenedTabId(userPageOwner.defaultWayCollections.favorite.uuid)}
                language={language}
              />
            </HorizontalContainer>
          </VerticalContainer>

          <VerticalContainer className={styles.collectionGroup}>
            <Title
              level={HeadingLevel.h2}
              text={LanguageService.user.collections.customCollections[language]}
              placeholder=""
            />

            <HorizontalContainer className={styles.tabsSection}>
              {userPageOwner.customWayCollections.map(collection => (
                <WayCollectionCard
                  key={collection.uuid}
                  isActive={collection.uuid === openedTabId}
                  collectionTitle={collection.name}
                  collectionWaysAmount={collection.ways.length}
                  onClick={() => setOpenedTabId(collection.uuid)}
                  language={language}
                />
              ))}

              {isPageOwner && (
                <Button
                  value={LanguageService.user.collections.addCollection[language]}
                  onClick={createCustomWayCollection}
                  className={styles.collectionButton}
                  buttonType={ButtonType.SECONDARY}
                />
              )}

            </HorizontalContainer>
          </VerticalContainer>
        </VerticalContainer>
      </HorizontalGridContainer>

      {isCustomCollection && isPageOwner && (
        <HorizontalContainer className={styles.temporalBlock}>
          <Confirm
            trigger={
              <Button
                value={LanguageService.user.collections.deleteCollection[language]}
                onClick={() => {}}
                buttonType={ButtonType.SECONDARY}
                className={styles.button}
              />
            }
            content={<p>
              {`${LanguageService.user.collections.deleteCollectionModalQuestion[language]} "${currentCollection.name}" ?`}
            </p>}
            onOk={() => deleteCustomWayCollections(currentCollection.uuid)}
            okText={LanguageService.modals.confirmModal.deleteButton[language]}
            cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
          />
          <Modal
            isOpen={isRenameCollectionModalOpen}
            content={
              <PromptModalContent
                defaultValue={currentCollection.name}
                placeholder="Collection name"
                close={() => setIsRenameCollectionModalOpen(false)}
                onOk={(name: string) => {
                  updateCustomWayCollection({id: openedTabId, name});
                  setIsRenameCollectionModalOpen(false);
                }}
                okButtonValue={LanguageService.modals.promptModal.okButton[language]}
                cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
              />
            }
            trigger={
              <Button
                value={LanguageService.user.collections.renameCollection[language]}
                onClick={() => setIsRenameCollectionModalOpen(true)}
              />
            }
          />
        </HorizontalContainer>
      )}

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
          ? (wayCollection: Partial<WayCollection>) => updateCustomWayCollection({id: currentCollection.uuid, ...wayCollection})
          : undefined
        }
        filterStatus={userPageSettings.filterStatus}
        setFilterStatus={(
          filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
        ) => updateUserPageSettings({filterStatus})}
        view={userPageSettings.view}
        setView={(view: View) => updateUserPageSettings({view})}
      />

    </VerticalContainer>
  );
});
