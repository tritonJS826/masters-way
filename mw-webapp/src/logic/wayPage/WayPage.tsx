import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {GoalMetricDAL} from "src/dataAccessLogic/GoalMetricDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {renderModalContent} from "src/logic/wayPage/reportsTable/WayColumns";
import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import {v4 as uuidv4} from "uuid";
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
 * Add mentor to Way
 */
const addMentorToWay = (
  way: Way,
  setWay: React.Dispatch<React.SetStateAction<Way | null>>,
  userPreview: UserPreview,
) => {
  const mentoringWays = userPreview.mentoringWays.concat(userPreview.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  UserPreviewDAL.updateUserPreview(newUserPreview);

  const mentors = way.mentors.concat(newUserPreview);
  const newWay = new Way({...way, mentors});

  WayDAL.updateWay(newWay);

  setWay(newWay);
};

/**
 * Add user to Way's mentor requests
 */
const addUserToMentorRequests = (
  way: Way,
  setWay: React.Dispatch<React.SetStateAction<Way | null>>,
  userPreview: UserPreview) => {

  const mentorRequests = way.mentorRequests.concat(userPreview);

  const newWay = new Way({...way, mentorRequests});

  WayDAL.updateWay(newWay);
  setWay(newWay);
};

/**
 * Remove user from Way's mentor requests
 */
const removeUserFromMentorRequests = (
  way: Way,
  setWay: React.Dispatch<React.SetStateAction<Way| null>>,
  userPreview: UserPreview) => {

  const mentorRequests = way.mentorRequests.filter((item) => item !== userPreview);

  const newWay = new Way({...way, mentorRequests});

  WayDAL.updateWay(newWay);
  setWay(newWay);
};

/**
 * Render all way's mentors
 */
const renderMentors = (way: Way) => {
  return way.mentors.map(({uuid, name}) => (
    <Link
      key={uuid}
      value={name}
      path={pages.user.getPath({uuid})}
      className={styles.mentors}
    />
  ));
};

/**
 * Render Way's mentor requests
 */
const renderMentorRequests = (way: Way, setWay: React.Dispatch<React.SetStateAction<Way | null>>) => {
  return way.mentorRequests.map((userPreview) => (
    <div key={userPreview.uuid}>
      <Link
        value={userPreview.name}
        path={pages.user.getPath({uuid: userPreview.uuid})}
      />
      <Button
        value='Accept'
        onClick={() => {
          addMentorToWay(way, setWay, userPreview);
        }}
      />
      <Button
        value='Decline'
        onClick={() => {
          removeUserFromMentorRequests(way, setWay, userPreview);
        }}
      />
    </div>
  ));
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

  await WayDAL.updateWayWithUser(updatedWay);

  const user = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);
  setUser(user);
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

  await WayDAL.updateWayWithUser(updatedWay);

  const user = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);
  setUser(user);
  setWay(updatedWay);
};

/**
 * Singular metric for goal
 */
class SingleGoalMetric {

  /**
   * Goal metric uuid
   */
  public uuid: string;

  /**
   * Metric uuid
   */
  public metricUuid: string;

  /**
   * Metric description
   */
  public description: string;

  /**
   * Metric is done or not
   */
  public isDone: boolean;

  /**
   * Date when metric was done
   */
  public doneDate: Date;

  constructor(params: SingleGoalMetric) {
    this.uuid = params.uuid;
    this.metricUuid = params.metricUuid;
    this.description = params.description;
    this.isDone = params.isDone;
    this.doneDate = params.doneDate;
  }

}

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
  const {user, setUser} = useGlobalContext();
  const [way, setWay] = useState<Way | null>(null);

  /**
   * Get Way
   */
  const loadPageData = async () => {
    const wayData = await WayDAL.getWay(props.uuid);

    if (!wayData) {
      navigate(pages.page404.getPath({}));
    }
    setWay(wayData);
  };

  useEffect(() => {
    loadPageData();
  }, [user]);

  if (!way) {
    return "loading...";
  }

  const isWayInFavorites = user && user.favoriteWays.includes(way.uuid);

  const isOwner = !!user && user.uuid === way.owner.uuid;
  const isMentor = !!user && way.mentors.some((mentor) => mentor.uuid === user.uuid);

  const isUserHasSentMentorRequest = !!user && way.mentorRequests.some((request) => request.uuid === user.uuid);
  const isEligibleToSendRequest = !!user && !isOwner && !isMentor && !isUserHasSentMentorRequest;

  const favoriteForUsersAmount = way.favoriteForUsers.length ?? 0;

  /**
   * Set goal metric to the way state
   */
  const setGoalMetric = (updatedGoalMetric: GoalMetric) => {
    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
  };

  /**
   * Remove singular goal Metric from goal
   */
  const removeSingularGoalMetric = async (singularGoalMetricUuid: string) => {
    const goalMetricToUpdate: GoalMetric = structuredClone(way.goal.metrics[0]);
    const indexToDelete = goalMetricToUpdate.metricUuids.indexOf(singularGoalMetricUuid);

    const AMOUNT_TO_DELETE = 1;
    goalMetricToUpdate.metricUuids.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.description.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.isDone.splice(indexToDelete, AMOUNT_TO_DELETE);
    goalMetricToUpdate.doneDate.splice(indexToDelete, AMOUNT_TO_DELETE);

    const updatedGoalMetric: GoalMetric = new GoalMetric(goalMetricToUpdate);

    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
    await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
  };

  /**
   * Change goal metric
   */
  const updateGoalMetric = async (updatedSingleGoalMetric: SingleGoalMetric) => {
    const goalMetricToUpdate: GoalMetric = structuredClone(way.goal.metrics[0]);
    const changedIndex = goalMetricToUpdate.metricUuids.indexOf(updatedSingleGoalMetric.metricUuid);

    const updatedGoalMetric: GoalMetric = new GoalMetric({
      ...goalMetricToUpdate,
      description: goalMetricToUpdate.description.map(
        (item, index) => index === changedIndex ? updatedSingleGoalMetric.description : item,
      ),
      isDone: goalMetricToUpdate.isDone.map(
        (item, index) => index === changedIndex ? updatedSingleGoalMetric.isDone : item,
      ),
      doneDate: goalMetricToUpdate.doneDate.map(
        (item, index) => index === changedIndex ? updatedSingleGoalMetric.doneDate : item,
      ),
    });

    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
    await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
  };

  /**
   * Render goal metric
   */
  const renderSingleGoalMetric = (singleGoalMetric: SingleGoalMetric) => {
    const tooltipContent = singleGoalMetric.isDone
      ? `Done date ${DateUtils.getShortISODateValue(singleGoalMetric.doneDate)}`
      : "Not finished yet...";

    return (
      <Tooltip content={tooltipContent}>
        <div
          key={singleGoalMetric.metricUuid}
          className={styles.singularMetric}
        >
          <Checkbox
            isEditable={isOwner}
            isDefaultChecked={singleGoalMetric.isDone}
            onChange={(isDone) => {
              const updatedSingleGoalMetric = new SingleGoalMetric({...singleGoalMetric, isDone});
              updateGoalMetric(updatedSingleGoalMetric);
            }
            }
          />
          <EditableText
            text={singleGoalMetric.description ?? ""}
            onChangeFinish={(description) => updateGoalMetric(
              new SingleGoalMetric({...singleGoalMetric, description}),
            )}
            isEditable={isOwner}
          />
          {isOwner && (
            <TrashIcon
              className={styles.icon}
              onClick={() => {

                /**
                 * CallBack triggered on press ok
                 */
                const onOk = () => removeSingularGoalMetric(singleGoalMetric.metricUuid);

                renderModalContent({
                  description: singleGoalMetric.description,
                  onOk,
                });
              }}
            />)
          }
        </div>
      </Tooltip>
    );
  };

  /**
   * Render goal metrics
   */
  const renderGoalMetric = (goalMetric: GoalMetric) => {
    return goalMetric.metricUuids.map((metricUuid, index) => renderSingleGoalMetric(
      {
        uuid: goalMetric.uuid,
        metricUuid,
        description: goalMetric.description[index],
        doneDate: goalMetric.doneDate[index],
        isDone: goalMetric.isDone[index],
      },
    ));
  };

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={`${way.name}`}
        onChangeFinish={(text) => changeWayName(way, text)}
        isEditable={isOwner}
      />
      <div>
        Amount of users who add it to favorite:
        {UnicodeSymbols.SPACE + favoriteForUsersAmount}
      </div>
      {
        isWayInFavorites &&
        <Button
          value={"Remove from favorite"}
          onClick={() => {
            deleteFavoriteFromWayAndFromUser(user, way, setUser, setWay);
          }}
        />
      }
      {
        !isWayInFavorites && user &&
        <Button
          value={"Add to favorite"}
          onClick={() => {
            addFavoriteToWayAndToUser(user, way, setUser, setWay);
          }}
        />
      }
      <div className={styles.goalSection}>
        <div>
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
        <div>
          <Title
            level={HeadingLevel.h3}
            text="Metrics"
          />
          {renderGoalMetric(way.goal.metrics[0])}
          {isOwner && (
            <Button
              value="Add new goal metric"
              onClick={async () => {

                /**
                 * Get current goal metric from way
                 */
                const currentGoalMetric = way.goal.metrics[0];

                const updatedGoalMetric = new GoalMetric({
                  uuid: currentGoalMetric.uuid,
                  description: currentGoalMetric.description.concat(""),
                  metricUuids: currentGoalMetric.metricUuids.concat(uuidv4()),
                  isDone: currentGoalMetric.isDone.concat(false),
                  doneDate: currentGoalMetric.doneDate.concat(new Date()),
                });

                setGoalMetric(updatedGoalMetric);
                await GoalMetricDAL.updateGoalMetric(updatedGoalMetric);
              }}
            />)
          }
        </div>
      </div>
      <Title
        level={HeadingLevel.h3}
        text="Way owner:"
      />
      <Link
        value={way.owner.name}
        path={pages.user.getPath({uuid: way.owner.uuid})}
        className={styles.mentors}
      />
      {!!way.mentors.length && (
        <>
          <Title
            level={HeadingLevel.h3}
            text="Mentors of this way:"
          />
          {renderMentors(way)}
        </>
      )}
      {isOwner && !!way.mentorRequests.length && (
        <>
          <Title
            level={HeadingLevel.h3}
            text="Requests to become mentor of this way:"
          />
          {renderMentorRequests(way, setWay)}
        </>
      )
      }
      {isEligibleToSendRequest && (
        <Button
          value="Apply as Mentor"
          onClick={() => {
            addUserToMentorRequests(way, setWay, user);
          }}
        />
      )
      }
      <ScrollableBlock>
        <DayReportsTable way={way} />
      </ScrollableBlock>
    </div>
  );
};

