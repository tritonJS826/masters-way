import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {DropdownMenuItem, DropdownMenuItemType} from "src/component/dropdown/dropdownMenuItem/DropdownMenuItem";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {Modal} from "src/component/modal/Modal";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {BaseWayData, WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {updateUser, UpdateUserParams} from "src/logic/userPage/UserPage";
import {GoalBlock} from "src/logic/wayPage/goalBlock/GoalBlock";
import {GoalMetricsBlock} from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock";
import {JobTags} from "src/logic/wayPage/jobTags/JobTags";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {downloadWayPdf} from "src/logic/wayPage/renderWayToPdf/downloadWayPdf";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable";
import {WayStatistic} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {WayPageSettings} from "src/utils/LocalStorageWorker";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/WayPage.module.scss";

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

  /**
   * Default job done block is opened
   * @default true
   */
  isJobDoneTagsVisible: true,
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
 * Update way Way
 */
const updateWay = async (params: UpdateWayParams) => {
  params.setWay(params.wayToUpdate);
  await WayDAL.updateWay(params.wayToUpdate);
};

/**
 * Update Way and User params
 */
type UpdateWayAndUserParams = UpdateWayParams & UpdateUserParams;

/**
 * Add way uuid to UserPreview favoriteWays and add user uuid to Way favoriteForUserUuids
 */
export const updateWayAndUser = async (params: UpdateWayAndUserParams) => {
  const updateWayPromise = updateWay({
    wayToUpdate: params.wayToUpdate,
    setWay: params.setWay,
  });

  const updateUserPromise = updateUser({
    userToUpdate: params.userToUpdate,
    setUser: params.setUser,
  });

  await Promise.all([updateWayPromise, updateUserPromise]);
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
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const [wayPageSettings,, updateWayPageSettings] = usePersistanceState({
    key: "wayPage",
    defaultValue: DEFAULT_WAY_PAGE_SETTINGS,
  });
  const {user, setUser} = useGlobalContext();
  const [way, setWay] = useState<Way>();

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
   * Update userPreview state
   */
  const setUserPreviewPartial = (previousUser: Partial<UserPreview>) => {
    if (!user) {
      throw new Error("Previous user is undefined");
    }
    const updatedUser: UserPreview = {...user, ...previousUser};
    setUser(updatedUser);
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

  const isWayInFavorites = user && user.favoriteWays.includes(way.uuid);

  const isOwner = !!user && user.uuid === way.owner.uuid;
  const isMentor = !!user && way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;

  const isUserHasSentMentorRequest = !!user && way.mentorRequests.some((request) => request.uuid === user.uuid);
  const isEligibleToSendRequest = !!user && !isOwner && !isMentor && !isUserHasSentMentorRequest;

  const favoriteForUsersAmount = way.favoriteForUserUuids.length;

  /**
   * Delete way
   */
  const deleteWay = async () => {
    isOwner && await WayDAL.deleteWay(way);
    user && navigate(pages.user.getPath({uuid: user.uuid}));
  };

  /**
   * Update day reports
   */
  const setDayReports = (dayReports: DayReport[]) => {
    const updatedWay = {...way, dayReports};
    setWay(updatedWay);
  };

  const renderDeleteWayDropdownItem = (
    <Confirm
      trigger={
        <DropdownMenuItem
          value="Delete the way"
          onClick={() => {}}
        />
      }
      content={<p>
        {`Are you sure you want to delete the way "${way.name}"?`}
      </p>}
      onOk={deleteWay}
      okText="Delete"
    />);

  /**
   * Add or remove way from custom collection depends on custom collections.
   */
  const toggleWayInWayCollectionByUuid = async (collectionUuid: string) => {
    if (!user) {
      throw new Error("User is not exist");
    }

    const updatedCustomWayCollections = user?.customWayCollections
      .map((userCollection) => {
        const isCollectionToUpdate = userCollection.id === collectionUuid;
        if (isCollectionToUpdate) {
          const isWayExistInCollection = userCollection.wayUuids.some(wayUuid => wayUuid === props.uuid);

          const updatedWayUuids = isWayExistInCollection
            ? userCollection.wayUuids.filter(wayUuid => wayUuid !== props.uuid)
            : userCollection.wayUuids.concat(props.uuid);

          return {...userCollection, wayUuids: updatedWayUuids};
        } else {
          return userCollection;
        }
      });

    setUser({...user, customWayCollections: updatedCustomWayCollections});
    await UserPreviewDAL.updateUserPreview({uuid: user.uuid, customWayCollections: updatedCustomWayCollections});
    displayNotification({
      text: "Collection updated",
      type: "info",
    });
  };

  const renderAddToCustomCollectionDropdownItems: DropdownMenuItemType[] = (user?.customWayCollections ?? [])
    .map((userCollection) => {
      const isWayInUserCollection = userCollection.wayUuids.some((wayUuid: string) => wayUuid === props.uuid);

      return {
        id: userCollection.id,
        value: (
          <DropdownMenuItem
            key={userCollection.id}
            value={`${isWayInUserCollection ? "Remove from" : "Add to"} ${userCollection.name}`}
            onClick={() => toggleWayInWayCollectionByUuid(userCollection.id)}
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
      jobTagsStringified: way.jobTags.map((jobTag) => JSON.stringify(jobTag)),
      metricsStringified: way.metrics.map(
        (metric) => JSON.stringify({...metric, isDone: false, doneDate: null}),
      ),
      wayTagsStringified: way.wayTags.map((wayTag) => JSON.stringify(wayTag)),
    };
    const newWay: Way = await WayDAL.createWay(user, baseWayData);

    await navigate(pages.way.getPath({uuid: newWay.uuid}));
    displayNotification({text: `Way ${way.name} copied`, type: "info"});
  };

  /**
   * Update goal
   */
  const updateGoalMetrics = async (metricsToUpdate: Metric[]) => {
    const isWayCompleted = metricsToUpdate.every((metric) => metric.isDone);

    await updateWay({
      wayToUpdate: {
        uuid: way.uuid,
        metrics: metricsToUpdate,
        status: isWayCompleted ? "Completed" : null,
      },
      setWay: setWayPartial,
    });
  };

  const isEmptyWay = way.dayReports.length === 0;
  const currentDate = DateUtils.getShortISODateValue(new Date());
  const lastReportDate = !isEmptyWay && DateUtils.getShortISODateValue(way.dayReports[0].createdAt);
  const isReportForTodayAlreadyCreated = lastReportDate === currentDate;
  const isReportForTodayIsNotCreated = isEmptyWay || !isReportForTodayAlreadyCreated;
  const isPossibleCreateDayReport = isUserOwnerOrMentor && isReportForTodayIsNotCreated;

  /**
   * Create day report
   */
  const createDayReport = async (wayUuid: string, dayReportsData: DayReport[]) => {
    const dayReportUuids = dayReportsData.map((report) => report.uuid);
    const newDayReport = await DayReportDAL.createDayReport(wayUuid, dayReportUuids);
    const dayReportsList = [newDayReport, ...dayReportsData];
    setDayReports(dayReportsList);
  };

  return (
    <VerticalContainer className={styles.container}>
      <HorizontalContainer className={styles.wayDashboard}>
        <VerticalContainer className={styles.wayInfo}>
          <HorizontalContainer className={styles.wayTitleBlock}>
            <Title
              level={HeadingLevel.h2}
              text={way.name}
              onChangeFinish={(name) => updateWay({
                wayToUpdate: {
                  uuid: way.uuid,
                  name,
                },
                setWay: setWayPartial,
              })}
              isEditable={isUserOwnerOrMentor}
              className={styles.wayName}
            />

            <HorizontalContainer className={styles.buttons}>
              <Tooltip
                content={`${isWayInFavorites ? "Delete from" : "Add to"} favorites`}
                position={PositionTooltip.LEFT}
              >
                <Button
                  value={`${isWayInFavorites
                    ? Symbols.STAR
                    : Symbols.OUTLINED_STAR
                  }${Symbols.NO_BREAK_SPACE}${favoriteForUsersAmount}`}
                  onClick={() => {
                    if (!user) {
                      return;
                    }

                    if (isWayInFavorites) {
                      updateWayAndUser({
                        wayToUpdate: {
                          uuid: way.uuid,
                          favoriteForUserUuids: way.favoriteForUserUuids
                            .filter((favoriteForUser) => favoriteForUser !== user.uuid),
                        },
                        userToUpdate: {
                          uuid: user.uuid,
                          favoriteWays: user.favoriteWays.filter((favoriteWay) => favoriteWay !== way.uuid),
                        },
                        setWay: setWayPartial,
                        setUser: setUserPreviewPartial,
                      });
                    } else {
                      updateWayAndUser({
                        wayToUpdate: {
                          uuid: way.uuid,
                          favoriteForUserUuids: way.favoriteForUserUuids.concat(user.uuid),
                        },
                        userToUpdate: {
                          uuid: user.uuid,
                          favoriteWays: user.favoriteWays.concat(way.uuid),
                        },
                        setWay: setWayPartial,
                        setUser: setUserPreviewPartial,
                      });
                    }

                    displayNotification({
                      text: `Way ${isWayInFavorites ? "removed from" : "added to" } favorites`,
                      type: "info",
                    });
                  }}
                  buttonType={ButtonType.TERTIARY}
                />
              </Tooltip>
              <Dropdown
                className={styles.wayActionMenu}
                trigger={(
                  <Button
                    value="Way actions"
                    buttonType={ButtonType.SECONDARY}
                    onClick={() => {}}
                  />
                )}
                dropdownMenuItems={[
                  {
                    id: "Repeat the way",
                    value: "Repeat the way",

                    /**
                     * Copy url to clipboard
                     */
                    onClick: repeatTheWay,
                    isVisible: !!user,
                  },
                  {
                    id: "Copy url to clipboard",
                    value: "Copy url to clipboard",

                    /**
                     * Copy url to clipboard
                     */
                    onClick: async () => {
                      await navigator.clipboard.writeText(location.href);
                      displayNotification({
                        text: "Url copied",
                        type: "info",
                      });
                    },
                  },
                  {
                    id: "Download as pdf",
                    value: "Download as pdf",

                    /**
                     * Download way as pdf
                     */
                    onClick: () => downloadWayPdf(way),
                  },
                  ...renderAddToCustomCollectionDropdownItems,
                  {
                    id: "Go to original way",
                    value: "Go to original",
                    isVisible: !!way.copiedFromWayUuid,

                    /**
                     * Go to original way (from which current way was copied)
                     */
                    onClick: () => navigate(pages.way.getPath({uuid: way.copiedFromWayUuid})),
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

          <HorizontalContainer className={styles.wayTagsContainer}>
            No-tags
            <Tooltip content="Edit way tags. Coming soon :)">
              <Button
                value={
                  <Icon
                    size={IconSize.SMALL}
                    name="PlusIcon"
                  />
                }
                onClick={() => {}}
                className={styles.flatButton}
              />
            </Tooltip>
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
              text="Metrics"
            />
            <Tooltip content={`Click to ${wayPageSettings.isGoalMetricsVisible ? "hide" : "open"} goal metrics block`}>
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
            isVisible={wayPageSettings.isGoalMetricsVisible}
            goalMetrics={way.metrics}
            updateGoalMetrics={updateGoalMetrics}
            isEditable={isUserOwnerOrMentor}
          />
        </VerticalContainer>
        <VerticalContainer className={styles.peopleBlock}>
          <Title
            level={HeadingLevel.h3}
            text="Way's owner:"
          />
          <Link
            path={pages.user.getPath({uuid: way.owner.uuid})}
            className={styles.mentors}
          >
            {way.owner.name}
          </Link>
          {!!way.mentors.size &&
            <MentorsSection
              way={way}
              setWay={setWayPartial}
              isOwner={isOwner}
            />}
          {isOwner && !!way.mentorRequests.length && (
            <MentorRequestsSection
              way={way}
              setWay={setWay}
            />
          )}
          {isEligibleToSendRequest && (
            <Button
              className={styles.applyAsMentorButton}
              value="Apply as Mentor"
              onClick={() => updateWay({
                wayToUpdate: {
                  uuid: way.uuid,
                  mentorRequests: way.mentorRequests.concat(user),
                },
                setWay: setWayPartial,
              })}
            />
          )}
        </VerticalContainer>

      </HorizontalContainer>

      <HorizontalContainer className={styles.statisticsBlock}>
        <VerticalContainer className={styles.statistics}>
          <HorizontalContainer className={styles.horizontalContainer}>
            <Title
              level={HeadingLevel.h3}
              text="Statistics"
            />
            <Tooltip content={`Click to ${wayPageSettings.isStatisticsVisible ? "hide" : "open"} statistics block`}>
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
          </HorizontalContainer>
          <WayStatistic
            dayReports={way.dayReports}
            wayCreatedAt={way.createdAt}
            isVisible={wayPageSettings.isStatisticsVisible}
          />
        </VerticalContainer>

      </HorizontalContainer>

      {isPossibleCreateDayReport &&
        <HorizontalContainer className={styles.dayReportActions}>
          <HorizontalContainer className={styles.reportActions}>
            {isPossibleCreateDayReport &&
              <Button
                value="Create new day report"
                onClick={() => createDayReport(way.uuid, way.dayReports)}
                buttonType={ButtonType.PRIMARY}
              />
            }
            <Modal
              trigger={
                <Button
                  value="Adjust job tags"
                  buttonType={ButtonType.SECONDARY}
                  onClick={() => { }}
                />
              }
              content={
                <div className={styles.jobDoneTagsWrapper}>
                  <Title
                    level={HeadingLevel.h3}
                    text="Job done tags:"
                  />
                  <JobTags
                    isVisible={wayPageSettings.isJobDoneTagsVisible}
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

      <Title
        level={HeadingLevel.h2}
        text={`Reports (${way.dayReports.length})`}
      />

      <div className={styles.dayReportsContent}>
        <ScrollableBlock>
          <DayReportsTable
            way={way}
            setDayReports={setDayReports}
          />
        </ScrollableBlock>
      </div>
    </VerticalContainer>
  );
};
