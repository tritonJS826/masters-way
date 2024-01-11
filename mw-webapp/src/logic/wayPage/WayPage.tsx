import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconClassName} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {GoalMetricsBlock} from "src/logic/wayPage/GoalMetricsBlock";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {renderModalContent} from "src/logic/wayPage/reportsTable/WayColumns";
import {WayStatistic} from "src/logic/wayPage/WayStatistic";
import {Goal} from "src/model/businessModel/Goal";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Default goalMetrics block is opened
 */
const DEFAULT_IS_STATISTICS_VISIBLE = "true";

/**
 * Default statistics block is opened
 */
const DEFAULT_IS_GOAL_METRICS_VISIBLE = "true";

/**
 * Change Goal description
 */
const changeGoalDescription = (goal: Goal, description: string) => {
  const newGoal = new Goal({...goal, description});
  GoalDAL.updateGoal(newGoal);
};

/**
 * Change name of Way
 * TODO: this function should change state
 */
const changeWayName = (currentWay: Way, text: string) => {
  const updatedWay = new Way({...currentWay, name: text});
  WayDAL.updateWay(updatedWay);
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
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const isCurrentGoalMetricsVisible = JSON.parse(localStorage.getItem("isGoalMetricsVisible") ?? DEFAULT_IS_GOAL_METRICS_VISIBLE);
  const isCurrentStatisticsVisible = JSON.parse(localStorage.getItem("isStatisticsVisible") ?? DEFAULT_IS_STATISTICS_VISIBLE);
  const [isGoalMetricsVisible, setIsGoalMetricsVisible] = useState<boolean>(isCurrentGoalMetricsVisible);
  const [isStatisticsVisible, setIsStatisticsVisible] = useState<boolean>(isCurrentStatisticsVisible);
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
    // Navigate to 404 Page if way with transmitted uuid doesn't exist
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
      dependency: [user],
    },
  );

  if (!way) {
    return (
      <span>
        loading...
      </span>
    );
  }

  const isWayInFavorites = user && user.favoriteWays.includes(way.uuid);

  const isOwner = !!user && user.uuid === way.owner.uuid;
  const isMentor = !!user && way.mentors.has(user.uuid);

  const isUserHasSentMentorRequest = !!user && way.mentorRequests.some((request) => request.uuid === user.uuid);
  const isEligibleToSendRequest = !!user && !isOwner && !isMentor && !isUserHasSentMentorRequest;

  const favoriteForUsersAmount = way.favoriteForUsers.length;

  /**
   * Change goal metrics visibility
   */
  const changeGoalMetricsVisibility = () => {
    localStorage.setItem("isGoalMetricsVisible", JSON.stringify(!isGoalMetricsVisible));
    setIsGoalMetricsVisible(!isGoalMetricsVisible);
  };

  /**
   * Change way statistics visibility
   */
  const changeStatisticsVisibility = () => {
    localStorage.setItem("isStatisticsVisible", JSON.stringify(!isStatisticsVisible));
    setIsStatisticsVisible(!isStatisticsVisible);
  };

  return (
    <div className={styles.container}>
      <HorizontalContainer className={styles.alignItems}>
        <Title
          level={HeadingLevel.h2}
          text={way.name}
          onChangeFinish={(text) => changeWayName(way, text)}
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
                  onClick={() =>
                    user && addFavoriteToWayAndToUser(user, way, setUser, setWay)
                  }
                  buttonType={ButtonType.TERTIARY}
                />
              </Tooltip>
          }
          {isOwner &&
          <Button
            value="Delete way"
            buttonType={ButtonType.TERTIARY}
            // TODO: need refactoring
            onClick={() => renderModalContent({
              description: `Are you sure that you want to delete way "${way.name}"?`,

              /**
               * CallBack triggered on press ok
               */
              onOk: async () => {
                await WayDAL.deleteWay(way);
                navigate(pages.user.getPath({uuid: user.uuid}));
              },
            })
            }
          />
          }
        </HorizontalContainer>
      </HorizontalContainer>
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
      />
      }
      {isOwner && !!way.mentorRequests.length && (
        <MentorRequestsSection
          way={way}
          setWay={setWay}
        />
      )
      }
      {isEligibleToSendRequest && (
        <Button
          value="Apply as Mentor"
          onClick={() =>
            addUserToMentorRequests(way, setWay, user)
          }
        />
      )
      }
      <div className={styles.goalSection}>
        <div className={styles.goalSubSection}>
          <Title
            level={HeadingLevel.h3}
            text="Goal"
          />
          <EditableTextarea
            text={way.goal.description}
            onChangeFinish={(description) => changeGoalDescription(way.goal, description)}
            rows={10}
            isEditable={isOwner}
            className={styles.goalDescription}
          />
        </div>
        <div className={styles.goalSubSection}>
          <HorizontalContainer className={styles.horizontalContainer}>
            <Title
              level={HeadingLevel.h3}
              text="Metrics"
            />
            <Tooltip content={`Click to ${isGoalMetricsVisible ? "hide" : "open"} goal metrics block`}>
              <div
                className={styles.iconContainer}
                onClick={() => changeGoalMetricsVisibility()}
              >
                {isGoalMetricsVisible ?
                  <Icon
                    iconName="EyeOpenedIcon"
                    className={IconClassName.MEDIUM}
                  />
                  :
                  <Icon
                    iconName="EyeSlashedIcon"
                    className={IconClassName.MEDIUM}
                  />
                }
              </div>
            </Tooltip>
          </HorizontalContainer>
          <GoalMetricsBlock
            isVisible={isGoalMetricsVisible}
            way={way}
            isEditable={isOwner}
          />
        </div>
        <div className={styles.goalSubSection}>
          <HorizontalContainer className={styles.horizontalContainer}>
            <Title
              level={HeadingLevel.h3}
              text="Statistics"
            />
            <Tooltip content={`Click to ${isStatisticsVisible ? "hide" : "open"} statistics block`}>
              <div
                className={styles.iconContainer}
                onClick={() => changeStatisticsVisibility()}
              >
                {isStatisticsVisible ?
                  <Icon
                    iconName="EyeOpenedIcon"
                    className={IconClassName.MEDIUM}
                  />
                  :
                  <Icon
                    iconName="EyeSlashedIcon"
                    className={IconClassName.MEDIUM}
                  />
                }
              </div>
            </Tooltip>
          </HorizontalContainer>
          <WayStatistic
            dayReports={way.dayReports}
            wayCreatedAt={way.createdAt}
            isVisible={isStatisticsVisible}
          />
        </div>
      </div>

      <ScrollableBlock>
        <DayReportsTable way={way} />
      </ScrollableBlock>
    </div>
  );
};
