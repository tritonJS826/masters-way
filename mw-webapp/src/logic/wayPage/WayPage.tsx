import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {GoalMetricStatisticsBlock} from "src/logic/wayPage/GoalMetricsBlock";
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
import {WayWorker} from "src/utils/WayWorker";
import styles from "src/logic/wayPage/WayPage.module.scss";

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
  const currentGoalMetricsVisibility = WayWorker.getCurrentGoalMetricsVisibility();
  const currentStatisticsVisibility = WayWorker.getCurrentStatisticsVisibility();
  const [isGoalMetricsVisible, setIsGoalMetricsVisible] = useState<boolean>(currentGoalMetricsVisibility);
  const [isStatisticsVisible, setIsStatisticsVisible] = useState<boolean>(currentStatisticsVisibility);
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

  return (
    <div className={styles.container}>
      <HorizontalContainer className={styles.alignItems}>
        <Title
          level={HeadingLevel.h2}
          text={`${way.name}`}
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
            <Select
              label=""
              value={JSON.stringify(isGoalMetricsVisible)}
              name="goalMetricsVisibility"
              options={[
                {id: "1", value: "true", text: "opened"},
                {id: "2", value: "false", text: "closed"},
              ]}
              onChange={(value) => {
                WayWorker.setGoalMetricsVisibility(JSON.parse(value));
                setIsGoalMetricsVisible(!isGoalMetricsVisible);
              }}
            />
          </HorizontalContainer>
          <GoalMetricStatisticsBlock
            isVisible={isGoalMetricsVisible}
            way={way}
            isOwner={isOwner}
          />
        </div>
        <div className={styles.goalSubSection}>
          <HorizontalContainer className={styles.horizontalContainer}>
            <Title
              level={HeadingLevel.h3}
              text="Statistics"
            />
            <Select
              label=""
              value={JSON.stringify(isStatisticsVisible)}
              name="statisticsVisibility"
              options={[
                {id: "1", value: "true", text: "opened"},
                {id: "2", value: "false", text: "closed"},
              ]}
              onChange={(value) => {
                WayWorker.setStatisticsVisibility(JSON.parse(value));
                setIsStatisticsVisible(!isStatisticsVisible);
              }}
            />
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
