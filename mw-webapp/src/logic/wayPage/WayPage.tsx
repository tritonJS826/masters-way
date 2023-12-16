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
 * Change description of Way
 */
const updateGoalInWay = (way: Way, description: string) => {
  const newGoal = new Goal({...way.goal, description});
  GoalDAL.updateGoal(newGoal);
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
 * Add way uuid to UserPreview favoriteWays and add user uuid to WayPreview favoriteForUserUuids
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
 * Delete way uuid from UserPreview favoriteWays and delete user uuid from WayPreview favoriteForUserUuids
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
 * PageProps
 */
interface WayPageProps {

  /**
   * Pages's uuid
   */
  uuid: string;
}

/**
 * Change name of Way
 * TODO: this function should change state
 */
const changeWayName = (currentWay: Way, text: string) => {
  const updatedWay = new Way({...currentWay, name: text});
  WayDAL.updateWay(updatedWay);
};

/**
 * Render all way's mentors
 */
const renderMentors = (wayPreview: Way) => {
  return wayPreview.mentors.map((item) => (
    <Link
      key={item.uuid}
      value={item.name}
      path={pages.user.getPath({uuid: item.uuid})}
      className={styles.mentors}
    />
  ));
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
   * Date owhen metric was done
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
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const {user, setUser} = useGlobalContext();
  const [way, setWay] = useState<Way>();
  const isOwner = user?.uuid === way?.owner.uuid;
  const isWayInFavorites = user && way && user.favoriteWays.includes(way.uuid);
  const favoriteForUsersAmount = way?.favoriteForUsers.length ?? 0;

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

  /**
   * Set goal metric to the way state
   */
  const setGoalMetric = (updatedGoalMetric: GoalMetric) => {
    if (!way) {
      throw new Error("Way is not exist");
    }
    setWay(new Way({...way, goal: new Goal({...way.goal, metrics: [updatedGoalMetric]})}));
  };

  /**
   * Remove singular goal Metric from goal
   */
  const removeSingularGoalMetric = async (singularGoalMetricUuid: string) => {
    if (!way) {
      throw new Error("Way is not exist");
    }
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
    if (!way) {
      throw new Error("Way is not exist");
    }
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
            isEditable
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
          />
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
          />
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

  if (!way) {
    return "loading...";
  }

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
      <div className={styles.goalSection}>
        <div>
          <Title
            level={HeadingLevel.h3}
            text="Goal"
          />
          <EditableTextarea
            text={way.goal.description}
            onChangeFinish={(description) => updateGoalInWay(way, description)}
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
          />
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
      {
        isWayInFavorites && setUser &&
        <Button
          value={"Remove from favorite"}
          onClick={() => {
            deleteFavoriteFromWayAndFromUser(user, way, setUser, setWay);
          }}
        />
      }
      {
        !isWayInFavorites && user && setUser &&
        <Button
          value={"Add to favorite"}
          onClick={() => {
            addFavoriteToWayAndToUser(user, way, setUser, setWay);
          }}
        />
      }
      {!!way.mentors.length && (
        <>
          <Title
            level={HeadingLevel.h3}
            text="Mentors of this way:"
          />
          {renderMentors(way)}
        </>
      )}
      <ScrollableBlock>
        <DayReportsTable way={way} />
      </ScrollableBlock>
    </div>
  );
};
