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
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {BaseWayData, WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {updateUser, UpdateUserParams} from "src/logic/userPage/UserPage";
import {GoalBlock} from "src/logic/wayPage/goalBlock/GoalBlock";
import {JobTags} from "src/logic/wayPage/jobTags/JobTags";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {downloadWayPdf} from "src/logic/wayPage/renderWayToPdf/downloadWayPdf";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable";
import {WayStatistic} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
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

  return (
    <div className={styles.container}>
      <HorizontalContainer className={styles.alignItems}>
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
          className={styles.titleH2}
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
      <div className={styles.jobDoneTagsWrapper}>
        <HorizontalContainer className={styles.horizontalContainer}>
          <Title
            level={HeadingLevel.h3}
            text="Job done tags:"
          />
          <Tooltip content={`Click to ${wayPageSettings.isJobDoneTagsVisible ? "hide" : "open"} jobDone tags block`}>
            <div
              className={styles.iconContainer}
              onClick={() => updateWayPageSettings({isJobDoneTagsVisible: !wayPageSettings.isJobDoneTagsVisible})}
            >
              <Icon
                size={IconSize.MEDIUM}
                name={wayPageSettings.isJobDoneTagsVisible ? "EyeOpenedIcon" : "EyeSlashedIcon"}
              />
            </div>
          </Tooltip>
        </HorizontalContainer>
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
      <HorizontalContainer className={styles.gap}>
        <Title
          level={HeadingLevel.h3}
          text="Way's owner:"
        />
        <Link
          value={way.owner.name}
          path={pages.user.getPath({uuid: way.owner.uuid})}
          className={styles.mentors}
        />
      </HorizontalContainer>
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
          value="Apply as Mentor"
          onClick={() => updateWay({
            wayToUpdate: {
              uuid: way.uuid,
              mentorRequests: way.mentorRequests.concat(user),
            },
            setWay: setWayPartial,
          })
          }
        />)}

      <HorizontalContainer className={styles.wrap}>

        <GoalBlock
          goalDescription={way.goalDescription}
          metrics={way.metrics}
          wayUuid={way.uuid}
          updateWay={(updated) => updateWay({
            wayToUpdate: {...updated},
            setWay: setWayPartial,
          })}
          isEditable={isUserOwnerOrMentor}
          wayPageSettings={wayPageSettings}
          updateWaySettings={updateWayPageSettings}
        />

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

      <ScrollableBlock>
        <DayReportsTable
          way={way}
          setDayReports={setDayReports}
        />
      </ScrollableBlock>
    </div>
  );
};
