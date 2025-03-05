import {useState} from "react";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {ErrorComponent} from "src/component/errorComponent/ErrorComponent";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {Tag, TagType} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {FavoriteUserTrainingDAL} from "src/dataAccessLogic/FavoriteUserTrainingDAL";
import {TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {TrainingTrainingTagDAL} from "src/dataAccessLogic/TrainingTrainingTagDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {useStore} from "src/hooks/useStore";
import {DescriptionBlock} from "src/logic/trainingPage/descriptionBlock/DescriptionBlock";
import {TopicsBlock} from "src/logic/trainingPage/topicsBlock/TopicsBlock";
import {TrainingPageStore} from "src/logic/trainingPage/TrainingPageStore";
import {Training} from "src/model/businessModel/Training";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {TrainingTag} from "src/model/businessModelPreview/TrainingPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/trainingPage/TrainingPage.module.scss";

const MAX_LENGTH_TRAINING_NAME = 50;
const MIN_LENGTH_TRAINING_NAME = 1;
const MAX_TRAINING_TAGS_AMOUNT = 3;

/**
 * Update Training params
 */
interface UpdateTrainingParams {

  /**
   * Training to update
   */
  trainingToUpdate: PartialWithUuid<Training>;

  /**
   * Callback to update training
   */
  setTraining: (training: PartialWithUuid<Training>) => void;
}

/**
 * Update Training
 */
const updateTraining = async (params: UpdateTrainingParams) => {
  params.setTraining(params.trainingToUpdate);
  await TrainingDAL.updateTraining(params.trainingToUpdate);
};

/**
 * PageProps
 */
interface TrainingPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * Training page
 */
export const TrainingPage = observer((props: TrainingPageProps) => {
  const navigate = useNavigate();
  const [isAddTrainingTagModalOpen, setIsAddTrainingTagModalOpen] = useState(false);
  const {language} = languageStore;
  const {theme} = themeStore;
  const {user} = userStore;
  const trainingPageStore = useStore<
  new (trainingUuid: string) => TrainingPageStore,
  [string], TrainingPageStore>({
      storeForInitialize: TrainingPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  if (!trainingPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const isOwner = !!user && user.uuid === trainingPageStore.training.owner.uuid;

  if (!isOwner && trainingPageStore.training.isPrivate) {
    return (
      <ErrorComponent
        title={LanguageService.training.privateInfo.title[language]}
        description={LanguageService.training.privateInfo.description[language]}
      />
    );
  }
  const isTrainingInFavorites = !!user && trainingPageStore.training.favoriteForUserUuids.includes(user.uuid);

  const favoriteTooltipTextForLoggedUser = isTrainingInFavorites
    ? LanguageService.training.trainingInfo.deleteFromFavoritesTooltip[language]
    : LanguageService.training.trainingInfo.addToFavoritesTooltip[language];

  const favoriteTooltipText = !user
    ? LanguageService.training.trainingInfo.favoriteAmountTooltip[language]
    : favoriteTooltipTextForLoggedUser;

  /**
   * Delete training
   */
  const deleteTraining = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await TrainingDAL.deleteTraining(trainingPageStore.training.uuid);
    navigate(pages.user.getPath({uuid: user.uuid}));
  };

  const renderDeleteTrainingDropdownItem = (
    <Confirm
      trigger={<>
        {LanguageService.training.trainingActions.deleteTheTraining[language]}
      </>}
      content={<p>
        {`${LanguageService.training.trainingActions.deleteTrainingQuestion[language]} "${trainingPageStore.training.name}"?`}
      </p>}
      onOk={deleteTraining}
      okText={LanguageService.modals.confirmModal.deleteButton[language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
    />);

  /**
   * Create way based on the training
   */
  const createWayOnTraining = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const newWayUuid = await WayDAL.createWayFromTraining(trainingPageStore.training.uuid);

    navigate(pages.way.getPath({uuid: newWayUuid}));
    displayNotification({text: `Way ${trainingPageStore.training.name} created`, type: NotificationType.INFO});
  };

  const isRenderAddTrainingTagButton = trainingPageStore.training.trainingTags.length < MAX_TRAINING_TAGS_AMOUNT;

  return (
    <VerticalContainer className={styles.container}>
      <HorizontalGridContainer className={styles.trainingDashboard}>
        <VerticalContainer className={styles.trainingDashBoardLeft}>
          <VerticalContainer className={styles.trainingInfo}>
            <HorizontalContainer className={styles.trainingTitleBlock}>
              <Infotip content={LanguageService.training.infotip.trainingName[language]} />
              <Title
                level={HeadingLevel.h2}
                text={trainingPageStore.training.name}
                placeholder={LanguageService.common.emptyMarkdown[language]}
                onChangeFinish={(name) => {
                  updateTraining({
                    trainingToUpdate: {
                      uuid: trainingPageStore.training.uuid,
                      name,
                    },

                    /**
                     * Update way's name
                     */
                    setTraining: () => trainingPageStore.training.updateName(name),
                  });
                }}
                isEditable={isOwner}
                className={styles.trainingName}
                validators={[
                  minLengthValidator(MIN_LENGTH_TRAINING_NAME, LanguageService.way.notifications.wayNameMinLength[language]),
                  maxLengthValidator(MAX_LENGTH_TRAINING_NAME, LanguageService.way.notifications.wayNameMaxLength[language]),
                ]}
              />

              <HorizontalContainer className={styles.trainingActionButtons}>
                <Tooltip
                  content={favoriteTooltipText}
                  position={PositionTooltip.LEFT}
                >
                  <Button
                    className={clsx(styles.trainingActionsIcon, {[styles.disabled]: !user})}
                    value={`${isTrainingInFavorites
                      ? Symbols.STAR
                      : Symbols.OUTLINED_STAR
                    }${Symbols.NO_BREAK_SPACE}${trainingPageStore.training.favoriteForUserUuids.length}`}
                    onClick={() => {
                      if (!user) {
                        return;
                      }

                      if (isTrainingInFavorites) {
                        FavoriteUserTrainingDAL.deleteFavoriteUserTraining(trainingPageStore.training.uuid);
                        trainingPageStore.training.deleteUserFromTrainingFavorites(user.uuid);
                      } else {
                        FavoriteUserTrainingDAL.createFavoriteUserTraining(trainingPageStore.training.uuid);
                        trainingPageStore.training.addUserToTrainingFavorites(user.uuid);
                      }

                      displayNotification({
                        text: isTrainingInFavorites
                          ? LanguageService.training.notifications.trainingRemovedFromFavorites[language]
                          : LanguageService.training.notifications.trainingAddedToFavorites[language],
                        type: NotificationType.INFO,
                      });
                    }}
                    buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                  />
                </Tooltip>

                <Dropdown
                  contentClassName={styles.trainingActionMenu}
                  trigger={(
                    <Tooltip
                      content={LanguageService.training.trainingInfo.trainingActionsTooltip[language]}
                      position={PositionTooltip.LEFT}
                    >
                      <Button
                        className={styles.trainingActionsIcon}
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
                      // TODO: Commented till privacy logic on backend will not be fixed
                        // {
                        //   id: "Make the training private/public",
                        //   isPreventDefaultUsed: false,
                        //   isVisible: isOwner,
                        //   value: trainingPageStore.training.isPrivate
                        //     ? LanguageService.training.peopleBlock.makePublicButton[language]
                        //     : LanguageService.training.peopleBlock.makePrivateButton[language],

                        //   /**
                        //    * Toggle training privacy
                        //    */
                        //   onClick: () => updateTraining({
                        //     trainingToUpdate: {
                        //       uuid: trainingPageStore.training.uuid,
                        //       isPrivate: !trainingPageStore.training.isPrivate,
                        //     },

                        //     /**
                        //      * Update isPrivate property
                        //      */
                        //     setTraining: () =>
                        // trainingPageStore.training.updateIsPrivate(!trainingPageStore.training.isPrivate),
                        //   }),
                        // },
                        {
                          id: "Create way based on the training",
                          isPreventDefaultUsed: false,
                          value: LanguageService.training.trainingActions.createWayOnTraining[language],

                          /**
                           * Create way based on the training
                           */
                          onClick: createWayOnTraining,
                          isVisible: !!user,
                        },
                        {
                          id: "Copy url to clipboard",
                          isPreventDefaultUsed: false,
                          value: LanguageService.training.trainingActions.copyUrlToClipboard[language],

                          /**
                           * Copy url to clipboard
                           */
                          onClick: async () => {
                            await navigator.clipboard.writeText(location.href);
                            displayNotification({
                              text: LanguageService.training.notifications.urlCopied[language],
                              type: NotificationType.INFO,
                            });
                          },
                        },
                        {
                          id: "Delete the training",
                          isPreventDefaultUsed: true,
                          value: renderDeleteTrainingDropdownItem,
                          isVisible: isOwner,
                        },
                      ],
                    },
                  ]}
                />
              </HorizontalContainer>
            </HorizontalContainer>

            <HorizontalContainer className={styles.trainingTagsContainer}>
              {trainingPageStore.training.trainingTags.map(tag => (
                <Tag
                  tagName={tag.name}
                  key={tag.name}
                  isDeletable={isOwner}
                  type={TagType.PRIMARY_TAG}
                  removeTooltipText={LanguageService.common.removeTag[language]}
                  onDelete={() => {
                    TrainingTrainingTagDAL.deleteTrainingTrainingTag({
                      trainingTagName: tag.name,
                      trainingId: trainingPageStore.training.uuid,
                    });
                    trainingPageStore.training.deleteTag(tag.name);
                  }}
                />
              ))}
              {!trainingPageStore.training.trainingTags.length && LanguageService.training.trainingInfo.noTags[language]}
              {isOwner && isRenderAddTrainingTagButton && (
                <Modal
                  isOpen={isAddTrainingTagModalOpen}
                  trigger={
                    <Tooltip content={LanguageService.training.trainingInfo.addTrainingTagButton[language]}>
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
                      title={LanguageService.training.trainingInfo.addTrainingTagModalButton[language]}
                      placeholder={LanguageService.training.trainingInfo.addTrainingTagModal[language]}
                      close={() => setIsAddTrainingTagModalOpen(false)}
                      onOk={async (tagName: string) => {
                        const isTrainingTagDuplicate = trainingPageStore.training.trainingTags
                          .some((tag) => tag.name === tagName);
                        if (isTrainingTagDuplicate) {
                          displayNotification({
                            text: `${LanguageService.training.trainingInfo.duplicateTagModal[language]}`,
                            type: NotificationType.INFO,
                          });
                        } else {
                          await TrainingTrainingTagDAL.createTrainingTrainingTag({
                            name: tagName,
                            trainingId: trainingPageStore.training.uuid,
                          });

                          const newTrainingTag = new TrainingTag({name: tagName});
                          trainingPageStore.training.addTag(newTrainingTag);
                        }
                      }}
                      okButtonValue={LanguageService.training.trainingInfo.addTrainingTagModalButton[language]}
                      cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
                    />
                  }
                />
              )}
            </HorizontalContainer>

            <DescriptionBlock
              description={trainingPageStore.training.description}
              updateTraining={(description) => updateTraining({
                trainingToUpdate: {
                  uuid: trainingPageStore.training.uuid,
                  description,
                },

                /**
                 * Update way's goalDescription
                 */
                setTraining: () => trainingPageStore.training.updateDescription(description),
              })}
              isEditable={isOwner}
            />

          </VerticalContainer>
          <VerticalContainer className={styles.peopleBlock}>
            <HorizontalContainer
              className={styles.privacyBlock}
              dataCy={userWaysAccessIds.privacyStatus}
            >
              <HorizontalContainer>
                <Infotip content={LanguageService.training.infotip.privacyStatus[language]} />
                <Title
                  level={HeadingLevel.h3}
                  text={LanguageService.training.peopleBlock.trainingPrivacy.title[language]}
                  placeholder=""
                />
                {Symbols.NO_BREAK_SPACE}
                {trainingPageStore.training.isPrivate
                  ? LanguageService.training.peopleBlock.trainingPrivacy.private[language]
                  : LanguageService.training.peopleBlock.trainingPrivacy.public[language]
                }
              </HorizontalContainer>
            </HorizontalContainer>

            <HorizontalContainer className={styles.ownerBlock}>
              <Infotip content={LanguageService.training.infotip.trainingOwner[language]} />
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.training.peopleBlock.trainingOwner[language]}
                placeholder=""
              />
              <Link
                path={pages.user.getPath({uuid: trainingPageStore.training.owner.uuid})}
                className={styles.mentors}
              >
                {trainingPageStore.training.owner.name}
              </Link>
            </HorizontalContainer>
          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.trainingTopics}>
          <Title
            level={HeadingLevel.h3}
            text={LanguageService.training.topicsBlock.topics[language]}
            placeholder=""
          />

          <TopicsBlock
            addTopic={(topic: TopicPreview) => trainingPageStore.training.addTopic(topic)}
            deleteTopic={(topicUuid: string) => trainingPageStore.training.deleteTopic(topicUuid)}
            isEditable={isOwner}
            topics={trainingPageStore.training.topics}
            trainingUuid={trainingPageStore.training.uuid}
          />
        </VerticalContainer>

      </HorizontalGridContainer>

    </VerticalContainer>
  );
});
