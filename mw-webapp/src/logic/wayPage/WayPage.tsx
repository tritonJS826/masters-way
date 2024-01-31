import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {updateUser, UpdateUserParams} from "src/logic/userPage/UserPage";
import {GoalBlock} from "src/logic/wayPage/goalBlock/GoalBlock";
import {JobTags} from "src/logic/wayPage/jobTags/JobTags";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {downloadWayPdf} from "src/logic/wayPage/renderWayToPdf/downloadWayPdf";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable";
import {WayStatistic} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {Goal} from "src/model/businessModel/Goal";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {localStorageWorker, WayPageSettings} from "src/utils/LocalStorageWorker";
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
 * Change name of Way
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
 * Get way page settings from local storage
 */
const getWayPageSavedSettings = () => localStorageWorker.getItemByKey<WayPageSettings>("wayPage") ?? DEFAULT_WAY_PAGE_SETTINGS;

/**
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const [wayPageSettings, setWayPageSettings] = useState<WayPageSettings>(getWayPageSavedSettings());
  const {user, setUser} = useGlobalContext();
  // TODO: goal inside way doesn't use for editing
  const [way, setWay] = useState<Way>();
  const [goal, setGoal] = useState<Goal>();

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
  const onError = () => {
    navigate(pages.page404.getPath({}));
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: Way) => {
    setWay(data);
    setGoal(data.goal);
  };

  useLoad(
    {
      loadData,
      onSuccess,
      onError,
      dependency: [props.uuid],
    },
  );

  if (!way || !goal) {
    return (
      <Loader />
    );
  }

  /**
   * Update way state
   */
  const setGoalPartial = (previousGoal: Partial<Goal>) => {
    if (goal) {
      const updatedGoal: Goal = {...goal, ...previousGoal};
      setGoal(updatedGoal);
    }
  };

  const isWayInFavorites = user && user.favoriteWays.includes(way.uuid);

  const isOwner = !!user && user.uuid === way.owner.uuid;
  const isMentor = !!user && way.mentors.has(user.uuid);

  const isUserHasSentMentorRequest = !!user && way.mentorRequests.some((request) => request.uuid === user.uuid);
  const isEligibleToSendRequest = !!user && !isOwner && !isMentor && !isUserHasSentMentorRequest;

  const favoriteForUsersAmount = way.favoriteForUsers.length;

  /**
   * Update way page settings
   */
  const updateWayPageSettings = (settingsToUpdate: Partial<WayPageSettings>) => {
    const previousWayPageSettings = getWayPageSavedSettings();
    const updatedSettings = {...previousWayPageSettings, ...settingsToUpdate};
    localStorageWorker.setItemByKey("wayPage", updatedSettings);
    setWayPageSettings(updatedSettings);
  };

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

  /**
   * Update goal
   */
  const updateGoal = async (goalToUpdate: PartialWithUuid<Goal>) => {
    await GoalDAL.updateGoal(goalToUpdate);
    setGoalPartial(goalToUpdate);
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
          isEditable={isOwner}
          className={styles.titleH2}
        />
        <HorizontalContainer className={styles.buttons}>
          {
            isWayInFavorites ?
              <Tooltip
                content="Delete from favorite"
                position={PositionTooltip.LEFT}
              >
                <Button
                  value={`${Symbols.STAR}${Symbols.NO_BREAK_SPACE}${favoriteForUsersAmount}`}
                  onClick={() =>
                    updateWayAndUser({
                      wayToUpdate: {
                        uuid: way.uuid,
                        favoriteForUsers: way.favoriteForUsers.filter((favoriteForUser) => favoriteForUser.uuid !== user.uuid),
                      },
                      userToUpdate: {
                        uuid: user.uuid,
                        favoriteWays: user.favoriteWays.filter((favoriteWay) => favoriteWay !== way.uuid),
                      },
                      setWay: setWayPartial,
                      setUser: setUserPreviewPartial,
                    })
                  }
                  buttonType={ButtonType.TERTIARY}
                />
              </Tooltip>
              :
              <Tooltip
                content="Add to favorite"
                position={PositionTooltip.LEFT}
              >
                <Button
                  value={`${Symbols.OUTLINED_STAR}${Symbols.NO_BREAK_SPACE}${favoriteForUsersAmount}`}
                  onClick={() => {
                    if (user) {
                      updateWayAndUser({
                        wayToUpdate: {
                          uuid: way.uuid,
                          favoriteForUsers: way.favoriteForUsers.concat(user),
                        },
                        userToUpdate: {
                          uuid: user.uuid,
                          favoriteWays: user.favoriteWays.concat(way.uuid),
                        },
                        setWay: setWayPartial,
                        setUser: setUserPreviewPartial,
                      });
                    }
                  }}
                  buttonType={ButtonType.TERTIARY}
                />
              </Tooltip>
          }
          <Button
            value="Download as pdf"
            onClick={() => downloadWayPdf(way)}
          />
          {isOwner &&
            <Confirm
              trigger={
                <Button
                  value="Delete way"
                  buttonType={ButtonType.TERTIARY}
                  onClick={() => {}}
                />}
              content={<p>
                {`Are you sure you want to delete the way "${way.name}"?`}
              </p>}
              onOk={() => deleteWay()}
              okText="Delete"
            />
          }
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
              {wayPageSettings.isJobDoneTagsVisible ?
                <Icon
                  size={IconSize.MEDIUM}
                  name="EyeOpenedIcon"
                />
                :
                <Icon
                  size={IconSize.MEDIUM}
                  name="EyeSlashedIcon"
                />
              }
            </div>
          </Tooltip>
        </HorizontalContainer>
        <JobTags
          isVisible={wayPageSettings.isJobDoneTagsVisible}
          jobTags={way.jobTags}
          isEditable={isOwner}
          updateTags={(tagsToUpdate: string[]) => updateWay({
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

      <GoalBlock
        goal={goal}
        updateGoal={updateGoal}
        isEditable={isOwner}
        wayPageSettings={wayPageSettings}
        updateWaySettings={updateWayPageSettings}
      />

      <WayStatistic
        dayReports={way.dayReports}
        wayCreatedAt={way.createdAt}
        isVisible={wayPageSettings.isStatisticsVisible}
      />

      <ScrollableBlock>
        <DayReportsTable
          way={way}
          setDayReports={setDayReports}
        />
      </ScrollableBlock>
    </div>
  );
};
