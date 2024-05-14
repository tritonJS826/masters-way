import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {DropdownMenuItem, DropdownMenuItemType} from "src/component/dropdown/dropdownMenuItem/DropdownMenuItem";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {displayNotification} from "src/component/notification/displayNotification";
import {ErrorComponent} from "src/component/privateRecourse/PrivateRecourse";
import {Tag} from "src/component/tag/Tag";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {FavoriteUserWayDAL} from "src/dataAccessLogic/FavoriteUserWayDAL";
import {MentorRequestDAL} from "src/dataAccessLogic/MentorRequestDAL";
import {WayCollectionWayDAL} from "src/dataAccessLogic/WayCollectionWayDAL";
import {BaseWayData, WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayTagDAL} from "src/dataAccessLogic/WayTagDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {getAllCollections} from "src/logic/userPage/UserPage";
import {GoalBlock} from "src/logic/wayPage/goalBlock/GoalBlock";
import {GoalMetricsBlock} from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock";
import {AdjustLabelsBlock} from "src/logic/wayPage/labels/AdjustLabelsModalContent";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {downloadWayPdf} from "src/logic/wayPage/renderWayToPdf/downloadWayPdf";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable";
import {WayActiveStatistic} from "src/logic/wayPage/wayStatistics/WayActiveStatistic";
import {MILLISECONDS_IN_DAY, SMALL_CORRECTION_MILLISECONDS, WayStatistic} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {getWayStatus, WayStatus} from "src/logic/waysTable/wayStatus";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {DefaultWayCollections, User, UserPlain, WayCollection} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {JobTag, WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayTag} from "src/model/businessModelPreview/WayTag";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {createCompositeWay} from "src/utils/createCompositeWay";
import {DateUtils} from "src/utils/DateUtils";
import {WayPageSettings} from "src/utils/LocalStorageWorker";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/WayPage.module.scss";

const LIKE_VALUE = 1;
const INCREMENT = 1;
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
  const {user, setUser} = userStore;
  const {language} = languageStore;
  const [way, setWay] = useState<Way>();
  const [isAddWayTagModalOpen, setIsAddWayTagModalOpen] = useState(false);

  /**
   * Update way state
   */
  const setWayPartial = (previousWay: Partial<Way>) => {
    setWay((prevWay?: Way) => {
      if (!prevWay) {
        throw new Error("Previous way is undefined");
      }

      return {...prevWay, ...previousWay};
    });
  };

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => WayDAL.getWay(props.uuid);

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = (error: Error) => {
    throw error;
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: Way) => {
    setWay(data);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
      dependency: [props.uuid],
    },
  );

  if (!way) {
    return (
      <Loader />
    );
  }

  const compositeWay = createCompositeWay(way);

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

  /**
   * Update day reports
   */
  const setDayReports = (dayReports: DayReport[] | ((prevDayReports: DayReport[]) => DayReport[])): void => {
    // TODO if statement exist because of pretend to set state functions
    if (typeof dayReports === "function") {
      setWay((prevWay) => {
        if (!prevWay) {
          return prevWay;
        }
        const updatedWay = new Way({
          ...prevWay,
          dayReports: dayReports(prevWay.dayReports),
        });

        return updatedWay;
      });
    } else {
      const updatedWay = new Way({...way, dayReports});
      setWay(updatedWay);
    }
  };

  const renderDeleteWayDropdownItem = (
    <Confirm
      trigger={
        <DropdownMenuItem
          value={LanguageService.way.wayActions.deleteTheWay[language]}
          onClick={() => {}}
        />
      }
      content={<p>
        {`Are you sure you want to delete the way "${way.name}"?`}
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
   * Add or remove way from custom collection depends on custom collections.
   */
  const toggleWayInWayCollectionByUuid = (collectionUuid: string) => {
    if (!user) {
      throw new Error("User is not exist");
    }

    const updatedCustomWayCollections = user?.customWayCollections
      .map((userCollection) => {
        const isCollectionToUpdate = userCollection.uuid === collectionUuid;
        if (isCollectionToUpdate) {
          const isWayExistInCollection = userCollection.ways.some(collectionWay => collectionWay.uuid === way.uuid);

          toggleWayInWay(isWayExistInCollection, collectionUuid, way.uuid);
          const mentors = Array.from(way.mentors).map(([, value]) => value);
          // TODO: converter required
          const updatedWay = new WayPreview({
            copiedFromWayUuid: way.copiedFromWayUuid,
            createdAt: way.createdAt,
            dayReportsAmount: way.dayReports.length,
            estimationTime: way.estimationTime,
            favoriteForUsers: way.favoriteForUsersAmount,
            goalDescription: way.goalDescription,
            isPrivate: way.isPrivate,
            lastUpdate: way.lastUpdate,
            mentors,
            metricsDone: way.metrics.filter((metric) => metric.isDone).length,
            metricsTotal: way.metrics.length,
            name: way.name,
            owner: way.owner,
            status: way.status,
            uuid: way.uuid,
            wayTags: way.wayTags,
          });

          const updatedWays = isWayExistInCollection
            ? userCollection.ways.filter(wayPreview => wayPreview.uuid !== way.uuid)
            : userCollection.ways.concat(updatedWay);

          const updatedWayCollection = new WayCollection({...userCollection, ways: updatedWays});

          return updatedWayCollection;
        } else {
          return userCollection;
        }

      });

    setUser({...user, customWayCollections: updatedCustomWayCollections});
    displayNotification({
      text: "Collection updated",
      type: "info",
    });
  };

  const renderAddToCustomCollectionDropdownItems: DropdownMenuItemType[] = (user?.customWayCollections ?? [])
    .map((userCollection) => {
      const isWayInUserCollection = userCollection.ways.some((wayPreview: WayPreview) => wayPreview.uuid === props.uuid);

      return {
        id: userCollection.uuid,
        value: (
          <DropdownMenuItem
            key={userCollection.uuid}
            value={`${isWayInUserCollection ? "Remove from" : "Add to"} ${userCollection.name}`}
            onClick={() => toggleWayInWayCollectionByUuid(userCollection.uuid)}
          />
        ),
      };
    });

  /**
   * Copy the way to owner
   */
  const repeatTheWay = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const baseWayData: BaseWayData = {
      name: way.name,
      copiedFromWayUuid: way.uuid,
      estimationTime: way.estimationTime,
      goalDescription: way.goalDescription,
      jobTags: way.jobTags,
      metrics: way.metrics.map(
        (metric) => {
          return {...metric, isDone: false, doneDate: null};
        }),
      wayTags: way.wayTags,
    };
    const newWay: WayPreview = await WayDAL.createWay(user, baseWayData);

    navigate(pages.way.getPath({uuid: newWay.uuid}));
    displayNotification({text: `Way ${way.name} copied`, type: "info"});
  };

  /**
   * Update goal
   */
  const updateGoalMetrics = async (metricsToUpdate: Metric[]) => {
    const isWayCompleted = metricsToUpdate.every((metric) => metric.isDone);
    const wayToUpdate = {
      uuid: way.uuid,
      metrics: metricsToUpdate,
      status: isWayCompleted
        ? WayStatus.completed
        : getWayStatus({
          status: isWayCompleted ? WayStatus.completed : null,
          lastUpdate: way.lastUpdate,
        }),
    };

    const allCollections = user && getAllCollections(user.defaultWayCollections, user.customWayCollections);
    allCollections?.map((collection) => {
      collection.updateWay({
        uuid: way.uuid,
        metricsDone: metricsToUpdate.filter((metricDone) => metricDone.isDone).length,
        metricsTotal: metricsToUpdate.length,
      });
    });

    setWayPartial(wayToUpdate);
  };

  const isWayComposite = !!way.children;

  const isEmptyWay = way.dayReports.length === 0;
  const currentDate = DateUtils.getShortISODateValue(new Date());
  const lastReportDate = !isEmptyWay && DateUtils.getShortISODateValue(way.dayReports[0].createdAt);
  const isReportForTodayAlreadyCreated = lastReportDate === currentDate;
  const isReportForTodayIsNotCreated = isEmptyWay || !isReportForTodayAlreadyCreated;
  const isPossibleCreateDayReport = isUserOwnerOrMentor && isReportForTodayIsNotCreated;

  /**
   * Create day report
   */
  const createDayReport = async (wayUuid: string): Promise<DayReport> => {
    const newDayReport = await DayReportDAL.createDayReport(wayUuid);
    setDayReports((prevDayReportsList) => [newDayReport, ...prevDayReportsList]);

    const allCollections = user && getAllCollections(user.defaultWayCollections, user.customWayCollections);
    allCollections?.map((collection) => {
      collection.updateWay({
        uuid: way.uuid,
        dayReportsAmount: way.dayReports.length + INCREMENT,
      });
    });

    return newDayReport;
  };

  const allDatesTimestamps = way.dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnWay = allDatesTimestamps.length
    ? Math.ceil((maximumDateTimestamp - minimumDateTimestamp + SMALL_CORRECTION_MILLISECONDS) / MILLISECONDS_IN_DAY)
    : 0
  ;

  const compositeWayParticipant = way.children
    ? way.children.map((child) => child.owner)
    : [];

  return (
    <VerticalContainer className={styles.container}>
      <HorizontalGridContainer className={styles.wayDashboard}>
        <VerticalContainer className={styles.wayDashBoardLeft}>
          <VerticalContainer className={styles.wayInfo}>
            <HorizontalContainer className={styles.wayTitleBlock}>
              <Title
                level={HeadingLevel.h2}
                text={way.name}
                onChangeFinish={(name) => {
                  updateWay({
                    wayToUpdate: {
                      uuid: way.uuid,
                      name,
                    },
                    setWay: setWayPartial,
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

              <HorizontalContainer className={styles.wayActionButtons}>
                <Tooltip
                  content={isWayInFavorites
                    ? LanguageService.way.wayInfo.deleteFromFavoritesTooltip[language]
                    : LanguageService.way.wayInfo.addToFavoritesTooltip[language]}
                  position={PositionTooltip.LEFT}
                >
                  <Button
                    className={styles.wayActionsIcon}
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
                        const updatedFavoriteCollection = new WayCollection({
                          ...user.defaultWayCollections.favorite,
                          ways: user.defaultWayCollections.favorite.ways
                            .filter((favoriteWay) => favoriteWay.uuid !== way.uuid),
                        });

                        const updatedUser = new User({
                          ...user,
                          defaultWayCollections: new DefaultWayCollections({
                            ...user.defaultWayCollections,
                            favorite: updatedFavoriteCollection,
                          }),
                        });

                        const allCollections = user && getAllCollections(user.defaultWayCollections, user.customWayCollections);
                        allCollections?.map((collection) => {
                          collection.updateWay({
                            uuid: way.uuid,
                            favoriteForUsers: favoriteAmount,
                          });
                        });
                        setUser(updatedUser);
                        setWayPartial({favoriteForUsersAmount: favoriteAmount});
                      } else {
                        FavoriteUserWayDAL.createFavoriteUserWay(user.uuid, way.uuid);
                        if (!favoriteWaysCollection) {
                          throw new Error("favoriteWaysCollection is undefined");
                        }
                        const favoriteAmount = way.favoriteForUsersAmount + LIKE_VALUE;

                        const mentors = Array.from(way.mentors.values());
                        // TODO: converter required
                        const updatedWay = new WayPreview({
                          copiedFromWayUuid: way.copiedFromWayUuid,
                          createdAt: way.createdAt,
                          dayReportsAmount: way.dayReports.length,
                          estimationTime: way.estimationTime,
                          favoriteForUsers: way.favoriteForUsersAmount,
                          goalDescription: way.goalDescription,
                          isPrivate: way.isPrivate,
                          lastUpdate: way.lastUpdate,
                          mentors,
                          metricsDone: way.metrics.reduce((acc, metric) => metric.isDone ? acc + INCREMENT : acc, 0),
                          metricsTotal: way.metrics.length,
                          name: way.name,
                          owner: way.owner,
                          status: way.status,
                          uuid: way.uuid,
                          wayTags: way.wayTags,
                        });

                        const updatedFavoriteCollection = new WayCollection({
                          ...user.defaultWayCollections.favorite,
                          ways: user.defaultWayCollections.favorite.ways
                            .concat(updatedWay),
                        });

                        const updatedUser = new User({
                          ...user,
                          defaultWayCollections: new DefaultWayCollections({
                            ...user.defaultWayCollections,
                            favorite: updatedFavoriteCollection,
                          }),
                        });

                        const allCollections = user && getAllCollections(user.defaultWayCollections, user.customWayCollections);
                        allCollections?.map((collection) => {
                          collection.updateWay({
                            uuid: way.uuid,
                            favoriteForUsers: favoriteAmount,
                          });
                        });

                        setUser(updatedUser);
                        setWayPartial({favoriteForUsersAmount: favoriteAmount});
                      }

                      displayNotification({
                        text: isWayInFavorites
                          ? LanguageService.way.notifications.wayRemovedFromFavorites[language]
                          : LanguageService.way.notifications.wayAddedToFavorites[language],
                        type: "info",
                      });
                    }}
                    buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                  />
                </Tooltip>
                <Dropdown
                  className={styles.wayActionMenu}
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
                        setWay: setWayPartial,
                      }),
                    },
                    {
                      id: "Repeat the way",
                      value: LanguageService.way.wayActions.repeatTheWay[language],

                      /**
                       * Copy url to clipboard
                       */
                      onClick: repeatTheWay,
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
                          type: "info",
                        });
                      },
                    },
                    {
                      id: "Download as pdf",
                      value: LanguageService.way.wayActions.downloadAsPdf[language],

                      /**
                       * Download way as pdf
                       */
                      onClick: () => downloadWayPdf(way),
                    },
                    ...renderAddToCustomCollectionDropdownItems,
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
            />

            <HorizontalContainer className={styles.wayTagsContainer}>
              {way.wayTags.map(tag => (
                <Tag
                  tagName={tag.name}
                  key={tag.uuid}
                  isDeletable={isOwner}
                  onDelete={() => {
                    WayTagDAL.deleteWayTag({wayTagId: tag.uuid, wayId: way.uuid});
                    const updatedWayTags = way.wayTags.filter(oldTag => oldTag.uuid !== tag.uuid);
                    const updatedWay = new Way({...way, wayTags: updatedWayTags});
                    setWay(updatedWay);
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
                      placeholder={LanguageService.way.wayInfo.addWayTagButton[language]}
                      close={() => setIsAddWayTagModalOpen(false)}
                      onOk={async (tagName: string) => {
                        const newTagRaw = await WayTagDAL.addWayTagToWay({name: tagName, wayUuid: way.uuid});
                        const newTag: WayTag = {name: newTagRaw.name, uuid: newTagRaw.uuid};
                        const updatedWayTags = [...way.wayTags, newTag];
                        const updatedWay = new Way({...way, wayTags: updatedWayTags});
                        setWay(updatedWay);
                      }}
                      okButtonValue={LanguageService.modals.promptModal.okButton[language]}
                      cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
                    />
                  }
                />
              )}
            </HorizontalContainer>

            <GoalBlock
              goalDescription={way.goalDescription}
              wayUuid={way.uuid}
              updateWay={(updated) => updateWay({
                wayToUpdate: {...updated},
                setWay: setWayPartial,
              })}
              isEditable={isUserOwnerOrMentor}
            />

          </VerticalContainer>
          <VerticalContainer className={styles.metricsBlock}>
            <HorizontalContainer className={styles.horizontalContainer}>
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.metricsBlock.metrics[language]}
              />
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
              updateGoalMetrics={updateGoalMetrics}
              isEditable={isUserOwnerOrMentor}
            />
          </VerticalContainer>

          <VerticalContainer className={styles.peopleBlock}>
            <HorizontalContainer className={styles.privacyBlock}>
              <Tooltip content={way.isPrivate
                ? LanguageService.way.peopleBlock.wayPrivacy.privateTooltip[language]
                : LanguageService.way.peopleBlock.wayPrivacy.publicTooltip[language]
              }
              >
                <Title
                  level={HeadingLevel.h3}
                  text={LanguageService.way.peopleBlock.wayPrivacy.title[language]}
                />
                {Symbols.NO_BREAK_SPACE}
                {way.isPrivate
                  ? LanguageService.way.peopleBlock.wayPrivacy.private[language]
                  : LanguageService.way.peopleBlock.wayPrivacy.public[language]
                }
              </Tooltip>
            </HorizontalContainer>

            <HorizontalContainer className={styles.compositeBlock}>
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.peopleBlock.wayComposite.title[language]}
              />
              <div>
                {isWayComposite
                  ? LanguageService.way.peopleBlock.wayComposite.text[language]
                  : LanguageService.way.peopleBlock.wayComposite.description[language]
                }
              </div>
            </HorizontalContainer>

            {isWayComposite &&
              <HorizontalContainer>
                <Title
                  level={HeadingLevel.h3}
                  text="Participants:"
                />
                {compositeWayParticipant.length !== 0 &&
                  compositeWayParticipant.map((participant) => {
                    return (
                      <Link
                        path={pages.user.getPath({uuid: participant.uuid})}
                        key={participant.uuid}
                      >
                        {participant.name}
                      </Link>
                    );
                  })
                }
              </HorizontalContainer>
            }
            {isWayComposite &&
            <HorizontalContainer className={styles.participantWay}>
              <Title
                level={HeadingLevel.h3}
                text="Participants ways:"
              />
              {!!way.children &&
                way.children.map((wayParticipant) => {
                  return (
                    <Link
                      path={pages.way.getPath({uuid: wayParticipant.uuid})}
                      className={styles.participantWay}
                      key={wayParticipant.uuid}
                    >
                      {wayParticipant.name}
                    </Link>
                  );
                })
              }
            </HorizontalContainer>
            }

            <HorizontalContainer>
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.peopleBlock.waysOwner[language]}
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
              setWay={setWayPartial}
              isOwner={isOwner}
            />}
            {isOwner && !!way.mentorRequests.length && (
              <Modal
                isOpen={true}
                trigger={<></>}
                content={
                  <MentorRequestsSection
                    way={way}
                    setWay={setWay}
                  />}
              />

            )}
            {isUserHasSentMentorRequest &&
              <Title
                level={HeadingLevel.h3}
                text={LanguageService.way.peopleBlock.mentorPendingRequest[language]}
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
                    setWay: setWayPartial,
                  });
                  await MentorRequestDAL.createMentorRequest(user.uuid, way.uuid);
                }}
              />
            )}
          </VerticalContainer>

        </VerticalContainer>

        <VerticalContainer className={styles.statistics}>
          <HorizontalContainer className={styles.horizontalContainer}>
            <Title
              level={HeadingLevel.h3}
              text={LanguageService.way.statisticsBlock.statistics[language]}
            />
            <Tooltip content={wayPageSettings.isStatisticsVisible
              ? LanguageService.way.statisticsBlock.clickToHideStatistics[language]
              : LanguageService.way.statisticsBlock.clickToShowStatistics[language]
            }
            >
              <button
                className={styles.iconContainer}
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
              className={styles.statisticsModal}
              content={
                <WayStatistic
                  dayReports={compositeWay.dayReports}
                  wayCreatedAt={compositeWay.createdAt}
                  isVisible={wayPageSettings.isStatisticsVisible}
                />
              }
            />
          </HorizontalContainer>
          <WayActiveStatistic
            dayReports={compositeWay.dayReports}
            wayCreatedAt={compositeWay.createdAt}
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
                onClick={() => {
                  createDayReport(way.uuid);
                }}
                buttonType={ButtonType.PRIMARY}
              />
            }
            <Modal
              trigger={
                <Button
                  value={LanguageService.way.filterBlock.adjustJobTags[language]}
                  buttonType={ButtonType.SECONDARY}
                  onClick={() => { }}
                />
              }
              content={
                <div className={styles.jobDoneTagsWrapper}>
                  <AdjustLabelsBlock
                    wayUuid={way.uuid}
                    jobTags={way.jobTags}
                    isEditable={isUserOwnerOrMentor}
                    updateTags={(tagsToUpdate: JobTag[]) => updateWay({
                      wayToUpdate: {
                        uuid: way.uuid,
                        jobTags: tagsToUpdate,
                      },
                      setWay: setWayPartial,
                    })}
                  />
                </div>
              }
            />
          </HorizontalContainer>
        </HorizontalContainer>
      }

      <DayReportsTable
        way={compositeWay}
        setDayReports={setDayReports}
        createDayReport={createDayReport}
      />

    </VerticalContainer>
  );
});
