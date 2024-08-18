import {useState} from "react";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {wayDescriptionAccessIds} from "cypress/accessIds/wayDescriptionAccessIds";
import {observer} from "mobx-react-lite";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {DropdownMenuItemType} from "src/component/dropdown/dropdownMenuItem/DropdownMenuItem";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Infotip} from "src/component/infotip/Infotip";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {ErrorComponent} from "src/component/privateRecourse/PrivateRecourse";
import {Separator} from "src/component/separator/Separator";
import {Tag, TagType} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {wayToWayPreview} from "src/dataAccessLogic/BusinessToBusinessPreviewConverter/wayToWayPreview";
import {CompositeWayDAL} from "src/dataAccessLogic/CompositeWayDAL";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {FavoriteUserWayDAL} from "src/dataAccessLogic/FavoriteUserWayDAL";
import {MentorRequestDAL} from "src/dataAccessLogic/MentorRequestDAL";
import {WayCollectionWayDAL} from "src/dataAccessLogic/WayCollectionWayDAL";
import {BaseWayData, WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayTagDAL} from "src/dataAccessLogic/WayTagDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {useStore} from "src/hooks/useStore";
import {getAllCollections} from "src/logic/userPage/UserPage";
import {GoalBlock} from "src/logic/wayPage/goalBlock/GoalBlock";
import {GoalMetricsBlock} from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock";
import {AdjustLabelsBlock} from "src/logic/wayPage/labels/AdjustLabelsModalContent";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {downloadWayPdf} from "src/logic/wayPage/renderWayToPdf/downloadWayPdf";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable";
import {WayPageStore} from "src/logic/wayPage/WayPageStore";
import {WayActiveStatistic} from "src/logic/wayPage/wayStatistics/WayActiveStatistic";
import {WayStatistic} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {DayReport} from "src/model/businessModel/DayReport";
import {Label} from "src/model/businessModel/Label";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils, DAY_MILLISECONDS, SMALL_CORRECTION_MILLISECONDS} from "src/utils/DateUtils";
import {WayPageSettings} from "src/utils/LocalStorageWorker";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/WayPage.module.scss";

const LIKE_VALUE = 1;
const DEFAULT_WAY_PAGE_SETTINGS: WayPageSettings = {

  /**
   * Default goalMetrics block is opened
   * @default true
   */
  isGoalMetricsVisible: true,

  /**
   * Default statistics block is opened
   * @default true
   */
  isStatisticsVisible: true,
};

/**
 * Update Way params
 */
interface UpdateWayParams {

  /**
   * Way to update
   */
  wayToUpdate: PartialWithUuid<Way>;

  /**
   * Callback to update way
   */
  setWay: (way: PartialWithUuid<Way>) => void;
}

/**
 * Update Way
 */
const updateWay = async (params: UpdateWayParams) => {
  params.setWay(params.wayToUpdate);
  await WayDAL.updateWay(params.wayToUpdate);
};

/**
 * PageProps
 */
interface WayPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * Way page
 */
export const WayPage = observer((props: WayPageProps) => {
  const navigate = useNavigate();
  const [wayPageSettings,, updateWayPageSettings] = usePersistanceState({
    key: "wayPage",
    defaultValue: DEFAULT_WAY_PAGE_SETTINGS,
  });
  const {user, updateCustomCollections} = userStore;

  const wayPageStore = useStore<
  new (wayUuid: string) => WayPageStore,
  [string], WayPageStore>({
      storeForInitialize: WayPageStore,
      dataForInitialization: [props.uuid],
      dependency: [props.uuid],
    });

  const {language} = languageStore;
  const {theme} = themeStore;
  const {way, setWayStatisticsTriple} = wayPageStore;
  const [isAddWayTagModalOpen, setIsAddWayTagModalOpen] = useState(false);

  if (!wayPageSettings || !wayPageStore.isInitialized) {
    return (
      <Loader
        theme={theme}
        isAbsolute
      />
    );
  }

  const favoriteWaysCollection = user?.defaultWayCollections.favorite;
  const isWayInFavorites = !!favoriteWaysCollection?.ways.find((favoriteWay) => favoriteWay.uuid === way.uuid);

  const isOwner = !!user && user.uuid === way.owner.uuid;
  const isMentor = !!user && way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;

  const isUserHasSentMentorRequest = !!user && way.mentorRequests.some((request) => request.uuid === user.uuid);
  const isEligibleToSendRequest = !!user && !isOwner && !isMentor && !isUserHasSentMentorRequest;

  if (!isUserOwnerOrMentor && way.isPrivate) {
    return (
      <ErrorComponent
        text={LanguageService.way.privateInfo.title[language]}
        description={LanguageService.way.privateInfo.description[language]}
      />
    );
  }

  /**
   * Delete way
   */
  const deleteWay = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    isOwner && await WayDAL.deleteWay(way.uuid);
    isOwner && user.defaultWayCollections.own.deleteWay(way.uuid);
    navigate(pages.user.getPath({uuid: user.uuid}));
  };

  const renderDeleteWayDropdownItem = (
    <Confirm
      trigger={<>
        {LanguageService.way.wayActions.deleteTheWay[language]}
      </>}
      content={<p>
        {`${LanguageService.way.wayActions.deleteWayQuestion[language]} "${way.name}"?`}
      </p>}
      onOk={deleteWay}
      okText={LanguageService.modals.confirmModal.deleteButton[language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
    />);

  /**
   * Toggle way in way collection
   */
  const toggleWayInWay = async (isWayExistInCollection: boolean, wayCollectionUuid: string, wayUuid: string) => {
    isWayExistInCollection
      ? await WayCollectionWayDAL.deleteWayCollectionWay(wayCollectionUuid, wayUuid)
      : await WayCollectionWayDAL.createWayCollectionWay(wayCollectionUuid, wayUuid);
  };

  /**
   * Add to or remove way from composite way
   */
  const toggleWayInCompositeWay = async (isWayExistInComposite: boolean, compositeWayUuid: string, wayUuid: string) => {
    if (!user) {
      throw new Error("User is not exist");
    }

    isWayExistInComposite
      ? await CompositeWayDAL.deleteWayFromComposite({childWayUuid: wayUuid, parentWayUuid: compositeWayUuid})
      : await CompositeWayDAL.addWayToComposite({childWayUuid: wayUuid, parentWayUuid: compositeWayUuid});
    displayNotification({
      text: `${LanguageService.way.notifications.compositeWayUpdated[language]}`,
      type: NotificationType.INFO,
    });

    isWayExistInComposite
      ? user.deleteWayFromComposite(compositeWayUuid, wayUuid)
      : user.addWayToComposite(compositeWayUuid, wayUuid);
  };

  /**
   * Add or remove way from custom collection depends on custom collections.
   */
  const toggleWayInWayCollectionByUuid = (collectionUuid: string) => {
    if (!user) {
      throw new Error("User is not exist");
    }

    user?.customWayCollections
      .map((userCollection) => {
        const isCollectionToUpdate = userCollection.uuid === collectionUuid;
        if (isCollectionToUpdate) {
          const isWayExistInCollection = userCollection.ways.some(collectionWay => collectionWay.uuid === way.uuid);

          toggleWayInWay(isWayExistInCollection, collectionUuid, way.uuid);

          const wayPreview = wayToWayPreview(way);

          updateCustomCollections(collectionUuid, isWayExistInCollection, wayPreview);
        }
      });

    displayNotification({
      text: `${LanguageService.way.notifications.collectionUpdated[language]}`,
      type: NotificationType.INFO,
    });
  };

  const renderAddToCompositeWayDropdownItems: DropdownMenuItemType[] = (user?.defaultWayCollections.own.ways
    .filter((defaultWay) => defaultWay.uuid !== way.uuid) ?? [])
    .map((ownWay) => {
      const isWayInComposite = ownWay.childrenUuids.includes(way.uuid);

      return {
        id: ownWay.uuid,
        value: isWayInComposite
          ? `${LanguageService.way.wayActions.deleteFromCompositeWay[language]} ${ownWay.name}`
          : `${LanguageService.way.wayActions.addToCompositeWay[language]} ${ownWay.name}`,

        /**
         * Add to or remove way from composite way
         */
        onClick: () => toggleWayInCompositeWay(isWayInComposite, ownWay.uuid, way.uuid),
      };
    });

  const renderAddToCustomCollectionDropdownItems: DropdownMenuItemType[] = (user?.customWayCollections ?? [])
    .map((userCollection) => {
      const isWayInUserCollection = userCollection.ways.some((wayPreview: WayPreview) => wayPreview.uuid === props.uuid);

      return {
        id: userCollection.uuid,
        value: isWayInUserCollection
          ? `${LanguageService.way.wayActions.deleteFrom[language]} ${userCollection.name}`
          : `${LanguageService.way.wayActions.addTo[language]} ${userCollection.name}`,

        /**
         * Add or remove way from custom collection depends on custom collections.
         */
        onClick: () => toggleWayInWayCollectionByUuid(userCollection.uuid),
      };
    });

  /**
   * Copy the way to owner
   */
  const repeatWay = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const baseWayData: BaseWayData = {
      name: way.name,
      copiedFromWayUuid: way.uuid,
      estimationTime: way.estimationTime,
      goalDescription: way.goalDescription,
    };
    const newWay: WayPreview = await WayDAL.createWay({
      userUuid: user.uuid,
      baseWayData,
      wayName: way.name,
    });

    navigate(pages.way.getPath({uuid: newWay.uuid}));
    displayNotification({text: `Way ${way.name} copied`, type: NotificationType.INFO});
  };

  const isWayComposite = way.children.length !== 0;

  const isEmptyWay = way.dayReports.length === 0;
  const currentDate = DateUtils.getShortISODateValue(new Date());
  const lastReportDate = !isEmptyWay && DateUtils.getShortISODateValue(way.dayReports[0].createdAt);
  const isLastReportExistInWay = !isEmptyWay &&
    !!(way.dayReports[0].compositionParticipants.find((item) => item.wayId === way.uuid));
  const isReportForTodayAlreadyCreated = isLastReportExistInWay && lastReportDate === currentDate;
  const isReportForTodayIsNotCreated = isEmptyWay || !isReportForTodayAlreadyCreated;
  const isPossibleCreateDayReport = isUserOwnerOrMentor && isReportForTodayIsNotCreated;

  /**
   * Create day report
   */
  const createDayReport = async (wayUuid: string): Promise<DayReport> => {
    const newDayReport = await DayReportDAL.createDayReport(wayUuid);
    way.addDayReport(newDayReport);

    return newDayReport;
  };

  const allDatesTimestamps = way.dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnWay = allDatesTimestamps.length
    ? Math.ceil((maximumDateTimestamp - minimumDateTimestamp + SMALL_CORRECTION_MILLISECONDS) / DAY_MILLISECONDS)
    : 0;

  const compositeWayOwnersParticipant = way.children.map((child) => child.owner).concat(way.owner);

  const compositeWayMentorsParticipant = way.children.reduce((acc: UserPlain[], child) =>
    acc.concat(Array.from(child.mentors.values())), Array.from(way.mentors.values()));

  const compositeWayFormerMentorsParticipant = way.children.reduce((acc: UserPlain[], child) =>
    acc.concat(Array.from(child.formerMentors.values())), Array.from(way.formerMentors.values()));

  const compositeWayParticipants = compositeWayOwnersParticipant
    .concat(compositeWayMentorsParticipant)
    .concat(compositeWayFormerMentorsParticipant);

  const favoriteTooltipTextForLoggedUser = isWayInFavorites
    ? LanguageService.way.wayInfo.deleteFromFavoritesTooltip[language]
    : LanguageService.way.wayInfo.addToFavoritesTooltip[language];

  const favoriteTooltipText = !user
    ? LanguageService.way.wayInfo.favoriteAmountTooltip[language]
    : favoriteTooltipTextForLoggedUser;

  return (
    <VerticalContainer className={styles.container}>
      <HorizontalGridContainer className={styles.wayDashboard}>
        <VerticalContainer className={styles.wayDashBoardLeft}>
          <VerticalContainer className={styles.wayInfo}>
            <HorizontalContainer className={styles.wayTitleBlock}>
              <HorizontalContainer>
                <Infotip content={LanguageService.way.infotip.wayName[language]} />
                <Title
                  cy={{dataCyTitleContainer: wayDescriptionAccessIds.wayDashBoardLeft.title}}
                  level={HeadingLevel.h2}
                  text={way.name}
                  placeholder={LanguageService.common.emptyMarkdown[language]}
                  onChangeFinish={(name) => {
                    updateWay({
                      wayToUpdate: {
                        uuid: way.uuid,
                        name,
                      },

                      /**
                       * Update way's name
                       */
                      setWay: () => way.updateName(name),
                    });
                    const allCollections = user && getAllCollections(user.defaultWayCollections, user.customWayCollections);
                    allCollections?.map((collection) => {
                      collection.updateWay({
                        uuid: way.uuid,
                        name,
                      });
                    });
                  }}
                  isEditable={isUserOwnerOrMentor}
                  className={styles.wayName}
                />
              </HorizontalContainer>

              <HorizontalContainer className={styles.wayActionButtons}>
                <Tooltip
                  content={favoriteTooltipText}
                  position={PositionTooltip.LEFT}
                >
                  <Button
                    className={clsx(styles.wayActionsIcon, {[styles.disabled]: !user})}
                    value={`${isWayInFavorites
                      ? Symbols.STAR
                      : Symbols.OUTLINED_STAR
                    }${Symbols.NO_BREAK_SPACE}${way.favoriteForUsersAmount}`}
                    onClick={() => {
                      if (!user) {
                        return;
                      }

                      if (isWayInFavorites) {
                        FavoriteUserWayDAL.deleteFavoriteUserWay(user.uuid, way.uuid);
                        if (!favoriteWaysCollection) {
                          throw new Error("favoriteWaysCollection is undefined");
                        }

                        const favoriteAmount = way.favoriteForUsersAmount - LIKE_VALUE;

                        user.deleteWayFromFavorite(way.uuid);
                        way.updateFavoriteForUsersAmount(favoriteAmount);
                      } else {
                        FavoriteUserWayDAL.createFavoriteUserWay(user.uuid, way.uuid);
                        if (!favoriteWaysCollection) {
                          throw new Error("favoriteWaysCollection is undefined");
                        }
                        const favoriteAmount = way.favoriteForUsersAmount + LIKE_VALUE;

                        const wayPreview = wayToWayPreview(way);

                        user.addWayToFavorite(wayPreview);
                        way.updateFavoriteForUsersAmount(favoriteAmount);
                      }

                      displayNotification({
                        text: isWayInFavorites
                          ? LanguageService.way.notifications.wayRemovedFromFavorites[language]
                          : LanguageService.way.notifications.wayAddedToFavorites[language],
                        type: NotificationType.INFO,
                      });
                    }}
                    buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                  />
                </Tooltip>

                <Dropdown
                  contentClassName={styles.wayActionMenu}
                  trigger={(
                    <Tooltip
                      content={LanguageService.way.wayInfo.wayActionsTooltip[language]}
                      position={PositionTooltip.LEFT}
                    >
                      <Button
                        className={styles.wayActionsIcon}
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
                      id: "Make the way private/public",
                      isVisible: isOwner,
                      value: way.isPrivate
                        ? LanguageService.way.peopleBlock.makePublicButton[language]
                        : LanguageService.way.peopleBlock.makePrivateButton[language],

                      /**
                       * Toggle way privacy
                       */
                      onClick: () => updateWay({
                        wayToUpdate: {
                          uuid: way.uuid,
                          isPrivate: !way.isPrivate,
                        },

                        /**
                         * Update isPrivate property
                         */
                        setWay: () => way.updateIsPrivate(!way.isPrivate),
                      }),
                    },
                    {
                      id: "Repeat the way",
                      value: LanguageService.way.wayActions.repeatWay[language],

                      /**
                       * Copy url to clipboard
                       */
                      onClick: repeatWay,
                      isVisible: !!user,
                    },
                    {
                      id: "Copy url to clipboard",
                      value: LanguageService.way.wayActions.copyUrlToClipboard[language],

                      /**
                       * Copy url to clipboard
                       */
                      onClick: async () => {
                        await navigator.clipboard.writeText(location.href);
                        displayNotification({
                          text: LanguageService.way.notifications.urlCopied[language],
                          type: NotificationType.INFO,
                        });
                      },
                    },
                    {
                      id: "Download as pdf",
                      value: LanguageService.way.wayActions.downloadAsPdf[language],

                      /**
                       * Download way as pdf
                       */
                      onClick: () => downloadWayPdf(way, wayPageStore.wayStatisticsTriple),
                    },
                    ...renderAddToCustomCollectionDropdownItems,
                    ...renderAddToCompositeWayDropdownItems,
                    {
                      id: "Go to original way",
                      value: LanguageService.way.wayActions.goToOriginal[language],
                      isVisible: !!way.copiedFromWayUuid,

                      /**
                       * Go to original way (from which current way was copied)
                       */
                      onClick: () => {
                        if (!way.copiedFromWayUuid) {
                          throw new Error("This way is original, not copied");
                        }
                        navigate(pages.way.getPath({uuid: way.copiedFromWayUuid}));
                      },
                    },
                    {
                      id: "Delete the way",
                      value: renderDeleteWayDropdownItem,
                      isVisible: isOwner,
                    },
                  ]}
                />
              </HorizontalContainer>
            </HorizontalContainer>

            <Title
              level={HeadingLevel.h5}
              text={`${totalDaysOnWay} ${LanguageService.way.wayInfo.daysFromStart[language]}`}
              placeholder=""
            />

            <HorizontalContainer className={styles.wayTagsContainer}>
              {way.wayTags.map(tag => (
                <Tag
                  tagName={tag.name}
                  key={tag.uuid}
                  isDeletable={isOwner}
                  type={TagType.PRIMARY_TAG}
                  removeTooltipText={LanguageService.common.removeTag[language]}
                  onDelete={() => {
                    WayTagDAL.deleteWayTag({wayTagId: tag.uuid, wayId: way.uuid});
                    way.deleteTag(tag.uuid);
                  }}
                />
              ))}
              {!way.wayTags.length && LanguageService.way.wayInfo.noTags[language]}
              {isOwner && (
                <Modal
                  isOpen={isAddWayTagModalOpen}
                  trigger={
                    <Tooltip content={LanguageService.way.wayInfo.addWayTagButton[language]}>
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
                      title={LanguageService.way.wayInfo.addWayTagModalTitle[language]}
                      placeholder={LanguageService.way.wayInfo.addWayTagModal[language]}
                      close={() => setIsAddWayTagModalOpen(false)}
                      onOk={async (tagName: string) => {
                        const isWayTagDuplicate = way.wayTags.some((tag) => tag.name === tagName);
                        if (isWayTagDuplicate) {
                          displayNotification({
                            text: `${LanguageService.way.wayInfo.duplicateTagModal[language]}`,
                            type: NotificationType.INFO,
                          });
                        } else {
                          const wayTag = await WayTagDAL.addWayTagToWay({name: tagName, wayUuid: way.uuid});
                          way.addTag(wayTag);
                        }
                      }}
                      okButtonValue={LanguageService.way.wayInfo.addWayTagModalButton[language]}
                      cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
                    />
                  }
                />
              )}
            </HorizontalContainer>

            <GoalBlock
              goalDescription={way.goalDescription}
              wayUuid={way.uuid}
              updateWay={(goalDescription) => updateWay({
                wayToUpdate: {
                  uuid: way.uuid,
                  goalDescription,
                },

                /**
                 * Update way's goalDescription
                 */
                setWay: () => way.updateGoalDescription(goalDescription),
              })}
              isEditable={isUserOwnerOrMentor}
            />

          </VerticalContainer>
          <VerticalContainer className={styles.metricsBlock}>
            <HorizontalContainer className={styles.horizontalContainer}>
              <HorizontalContainer>
                <Infotip content={LanguageService.way.infotip.metrics[language]} />
                <Title
                  level={HeadingLevel.h3}
                  text={LanguageService.way.metricsBlock.metrics[language]}
                  placeholder=""
                />
              </HorizontalContainer>
              <Tooltip content={wayPageSettings.isGoalMetricsVisible
                ? LanguageService.way.metricsBlock.clickToHideMetrics[language]
                : LanguageService.way.metricsBlock.clickToShowMetrics[language]
              }
              >
                <button
                  className={styles.iconContainer}
                  onClick={() => updateWayPageSettings({isGoalMetricsVisible: !wayPageSettings.isGoalMetricsVisible})}
                >
                  <Icon
                    size={IconSize.MEDIUM}
                    name={wayPageSettings.isGoalMetricsVisible ? "EyeOpenedIcon" : "EyeSlashedIcon"}
                  />
                </button>
              </Tooltip>
            </HorizontalContainer>
            <GoalMetricsBlock
              wayUuid={way.uuid}
              isVisible={wayPageSettings.isGoalMetricsVisible}
              goalMetrics={way.metrics}
              addMetric={(metric: Metric) => way.addMetric(metric)}
              deleteMetric={(metricUuid: string) => way.deleteMetric(metricUuid)}
              isEditable={isUserOwnerOrMentor}
              goalDescription={way.goalDescription}
              wayName={way.name}
            />
          </VerticalContainer>

          <VerticalContainer className={styles.peopleBlock}>
            <HorizontalContainer className={styles.privacyBlock}>
              <Tooltip content={way.isPrivate
                ? LanguageService.way.peopleBlock.wayPrivacy.privateTooltip[language]
                : LanguageService.way.peopleBlock.wayPrivacy.publicTooltip[language]
              }
              >
                <HorizontalContainer>
                  <Infotip content={LanguageService.way.infotip.privacyStatus[language]} />
                  <Title
                    level={HeadingLevel.h3}
                    text={LanguageService.way.peopleBlock.wayPrivacy.title[language]}
                    placeholder=""
                  />
                </HorizontalContainer>
                {Symbols.NO_BREAK_SPACE}
                {way.isPrivate
                  ? LanguageService.way.peopleBlock.wayPrivacy.private[language]
                  : LanguageService.way.peopleBlock.wayPrivacy.public[language]
                }
              </Tooltip>
            </HorizontalContainer>

            <HorizontalContainer className={styles.compositeBlock}>
              <Infotip content={LanguageService.way.infotip.wayType[language]} />
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.peopleBlock.wayComposite.title[language]}
                placeholder=""
              />
              <div>
                {isWayComposite
                  ? LanguageService.way.peopleBlock.wayComposite.composite[language]
                  : LanguageService.way.peopleBlock.wayComposite.ordinary[language]
                }
              </div>
            </HorizontalContainer>

            {isWayComposite &&
              <VerticalContainer className={styles.childWaysBlock}>
                <HorizontalContainer>
                  <Infotip content={LanguageService.way.infotip.childrenWays[language]} />
                  <Title
                    level={HeadingLevel.h3}
                    text={LanguageService.way.peopleBlock.childWays[language]}
                    placeholder=""
                  />
                </HorizontalContainer>

                {way.children.map((child) => {
                  const isAbandoned = child.status === WayStatus.abandoned;

                  return (
                    <>
                      <HorizontalContainer
                        key={child.uuid}
                        className={styles.childWay}
                      >
                        <HorizontalContainer>
                          <Avatar
                            alt={child.owner.name}
                            src={child.owner.imageUrl}
                            size={AvatarSize.SMALL}
                            className={styles.avatar}
                          />
                          <VerticalContainer className={clsx(isAbandoned && styles.abandonedWay)}>
                            <Link
                              path={pages.way.getPath({uuid: child.uuid})}
                              className={styles.participantWay}
                            >
                              {child.name}
                            </Link>
                            <Link
                              path={pages.user.getPath({uuid: child.owner.uuid})}
                              className={styles.participantWay}
                            >
                              {child.owner.name}
                            </Link>
                            {child.status}
                          </VerticalContainer>
                        </HorizontalContainer>

                        <Confirm
                          trigger={
                            <Tooltip content={LanguageService.way.peopleBlock.deleteFromComposite[language]}>
                              <Button
                                className={styles.removeButton}
                                onClick={() => {}}
                                buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                                value={
                                  <Icon
                                    size={IconSize.SMALL}
                                    name="RemoveIcon"
                                    className={styles.removeIcon}
                                  />}
                              />
                            </Tooltip>
                          }
                          content={<p>
                            {LanguageService.way.peopleBlock.deleteWayFromCompositeModalContent[language]
                              .replace("$participant", `"${child.name}"`)}
                          </p>}
                          onOk={async () => {
                            await CompositeWayDAL.deleteWayFromComposite({childWayUuid: child.uuid, parentWayUuid: way.uuid});
                            way.deleteChildWay(child.uuid);
                          }}
                          okText={LanguageService.modals.confirmModal.deleteButton[language]}
                          cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                        />
                      </HorizontalContainer>
                      <Separator />
                    </>
                  );
                })
                }
              </VerticalContainer>
            }

            <HorizontalContainer className={styles.ownerBlock}>
              <Infotip content={LanguageService.way.infotip.wayOwner[language]} />
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.peopleBlock.waysOwner[language]}
                placeholder=""
              />
              <Link
                path={pages.user.getPath({uuid: way.owner.uuid})}
                className={styles.mentors}
              >
                {way.owner.name}
              </Link>
            </HorizontalContainer>
            {!!way.mentors.size &&
            <MentorsSection
              way={way}
              setWay={() => {}}
              isOwner={isOwner}
            />}
            {isOwner && !!way.mentorRequests.length && (
              <Modal
                isOpen={true}
                trigger={<></>}
                content={
                  <MentorRequestsSection
                    way={way}
                    acceptMentorRequest={(mentor: UserPlain) => way.addUserToMentors(mentor)}
                    declineMentorRequest={(userUuid: string) => way.deleteUserFromMentorRequests(userUuid)}
                  />}
              />

            )}
            {isUserHasSentMentorRequest &&
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.peopleBlock.mentorPendingRequest[language]}
                placeholder=""
              />
            }
            {isEligibleToSendRequest && (
              <Button
                className={styles.applyAsMentorButton}
                value={LanguageService.way.peopleBlock.applyAsMentor[language]}
                onClick={async () => {
                  const userForMentorRequest = new UserPlain({...user});
                  updateWay({
                    wayToUpdate: {
                      uuid: way.uuid,
                      mentorRequests: way.mentorRequests.concat(userForMentorRequest),
                    },

                    /**
                     * Add mentor request from user
                     */
                    setWay: () => way.addUserToMentorRequests(userForMentorRequest),
                  });
                  await MentorRequestDAL.createMentorRequest(user.uuid, way.uuid);
                }}
              />
            )}
          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.statistics}>
          <HorizontalContainer className={styles.horizontalContainer}>
            <HorizontalContainer>
              <Infotip content={LanguageService.way.infotip.statistics[language]} />
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.statisticsBlock.statistics[language]}
                placeholder=""
              />
            </HorizontalContainer>
            <Tooltip content={wayPageSettings.isStatisticsVisible
              ? LanguageService.way.statisticsBlock.clickToHideStatistics[language]
              : LanguageService.way.statisticsBlock.clickToShowStatistics[language]
            }
            >
              <button
                className={clsx(styles.iconContainer, styles.statisticEyeButton)}
                onClick={() => updateWayPageSettings({isStatisticsVisible: !wayPageSettings.isStatisticsVisible})}
              >
                <Icon
                  size={IconSize.MEDIUM}
                  name={wayPageSettings.isStatisticsVisible ? "EyeOpenedIcon" : "EyeSlashedIcon"}
                />
              </button>
            </Tooltip>
            <Modal
              trigger={
                <Tooltip content={LanguageService.way.statisticsBlock.allStatisticTooltip[language]}>
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
              contentClassName={styles.statisticsModal}
              content={
                <WayStatistic
                  wayStatisticsTriple={wayPageStore.wayStatisticsTriple}
                  isVisible={wayPageSettings.isStatisticsVisible}
                />
              }
            />
          </HorizontalContainer>
          <WayActiveStatistic
            wayStatistics={wayPageStore.wayStatisticsTriple}
            isVisible={wayPageSettings.isStatisticsVisible}
          />
        </VerticalContainer>

      </HorizontalGridContainer>

      {isUserOwnerOrMentor &&
        <HorizontalContainer className={styles.dayReportActions}>
          <HorizontalContainer>
            {isPossibleCreateDayReport &&
              <Button
                value={LanguageService.way.filterBlock.createNewDayReport[language]}
                onClick={async () => {
                  createDayReport(way.uuid);
                  const updatedStatistics = await WayDAL.getWayStatisticTripleById(way.uuid);
                  wayPageStore.setWayStatisticsTriple(updatedStatistics);
                }}
                buttonType={ButtonType.PRIMARY}
              />
            }
            <Modal
              trigger={
                <Button
                  value={LanguageService.way.filterBlock.adjustLabels[language]}
                  buttonType={ButtonType.SECONDARY}
                  onClick={() => { }}
                />
              }
              content={
                <div className={styles.labelsWrapper}>
                  <AdjustLabelsBlock
                    wayUuid={way.uuid}
                    jobTags={way.jobTags}
                    isEditable={isUserOwnerOrMentor}
                    addLabel={(label: Label) => way.addLabel(label)}
                    deleteLabel={(labelUuid: string) => way.deleteLabel(labelUuid)}
                  />
                </div>
              }
            />
          </HorizontalContainer>
        </HorizontalContainer>
      }

      <DayReportsTable
        way={way}
        setWayStatisticsTriple={setWayStatisticsTriple}
        createDayReport={createDayReport}
        compositeWayParticipant={compositeWayParticipants}
      />

    </VerticalContainer>
  );
});
