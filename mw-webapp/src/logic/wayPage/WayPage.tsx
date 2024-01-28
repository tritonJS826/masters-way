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
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {GoalBlock} from "src/logic/wayPage/goalBlock/GoalBlock";
import {JobTags} from "src/logic/wayPage/jobTags/JobTags";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {downloadWayPdf} from "src/logic/wayPage/renderWayToPdf/downloadWayPdf";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {localStorageWorker, WayPageSettings} from "src/utils/LocalStorage";
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
   * Callback to update wy
   */
  setWay: (way: (prevWay: Way | undefined) => Way) => void;
}

/**
 * Change name of Way
 */
const updateWay = async (params: UpdateWayParams) => {

  /**
   * Show error
   */
  const showError = () => {
    throw Error("Way is undefined");
  };

  await WayDAL.updateWay({...params.wayToUpdate});

  params.setWay((prevWay) => prevWay ? new Way({...prevWay, ...params.wayToUpdate}) : showError());
};

/**
 * Add user to Way's mentor requests
 */
const addUserToMentorRequests = (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: UserPreview) => {

  const mentorRequests = way.mentorRequests.concat(userPreview);

  const newWay = new Way({...way, mentorRequests});

  WayDAL.updateWay(newWay);
  setWay(newWay);
};

/**
 * Create user with updated favorites
 */
const createUserPreviewWithUpdatedFavorites = (user: UserPreview, updatedFavoriteWays: string[]) => {
  return new UserPreview({
    ...user,
    favoriteWays: updatedFavoriteWays,
  });
};

/**
 * Add way uuid to UserPreview favoriteWays and add user uuid to Way favoriteForUserUuids
 */
const addFavoriteToWayAndToUser = async (
  userPreview: UserPreview,
  oldWay: Way,
  setUser: (user: UserPreview) => void,
  setWay: (way: Way) => void,
) => {
  const updatedFavoriteForUser: UserPreview[] = oldWay.favoriteForUsers.concat(userPreview);
  const updatedFavoriteWays = userPreview.favoriteWays.concat(oldWay.uuid);

  const updatedWay = new Way({
    ...oldWay,
    favoriteForUsers: updatedFavoriteForUser,
    owner: {
      ...oldWay.owner,
      favoriteWays: updatedFavoriteWays,
    },
  });
  const updatedUser = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);

  await WayDAL.updateWayWithUser(updatedWay, updatedUser);

  setUser(updatedUser);
  setWay(updatedWay);
};

/**
 * Delete way uuid from UserPreview favoriteWays and delete user uuid from Way favoriteForUserUuids
 */
const deleteFavoriteFromWayAndFromUser = async (
  userPreview: UserPreview,
  oldWay: Way,
  setUser: (user: UserPreview) => void,
  setWay: (way: Way) => void,
) => {
  const updatedFavoriteForUsers = oldWay.favoriteForUsers.filter((favorite) => favorite.uuid !== userPreview.uuid);
  const updatedFavoriteWays = userPreview.favoriteWays.filter((favoriteWay) => favoriteWay !== oldWay.uuid);

  const updatedWay = new Way({
    ...oldWay,
    favoriteForUsers: updatedFavoriteForUsers,
    owner: {
      ...oldWay.owner,
      favoriteWays: updatedFavoriteWays,
    },
  });
  const updatedUser = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);

  await WayDAL.updateWayWithUser(updatedWay, updatedUser);

  setUser(updatedUser);
  setWay(updatedWay);
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
 * Get way page settings from localstorage
 */
const getWayPageSavedSettings = () => localStorageWorker.getItemByKey<WayPageSettings>("wayPage") ?? DEFAULT_WAY_PAGE_SETTINGS;

/**
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const [wayPageSettings, setWayPageSettings] = useState<WayPageSettings>(getWayPageSavedSettings());
  const {user, setUser} = useGlobalContext();
  const [way, setWay] = useState<Way>();

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

  return (
    <div className={styles.container}>
      <HorizontalContainer className={styles.alignItems}>
        <Title
          level={HeadingLevel.h2}
          text={way.name}
          onChangeFinish={(name) => updateWay({
            wayToUpdate: {uuid: way.uuid, name},
            setWay,
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
                    deleteFavoriteFromWayAndFromUser(user, way, setUser, setWay)
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
                      addFavoriteToWayAndToUser(user, way, setUser, setWay);
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
            wayToUpdate: {uuid: way.uuid, jobTags: tagsToUpdate},
            setWay,
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
        setWay={setWay}
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
          onClick={() =>
            addUserToMentorRequests(way, setWay, user)
          }
        />)}

      <GoalBlock
        way={way}
        wayPageSettings={wayPageSettings}
        updateWaySettings={updateWayPageSettings}
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
