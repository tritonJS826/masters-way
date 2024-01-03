import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {TrashIcon} from "@radix-ui/react-icons";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {GoalDAL} from "src/dataAccessLogic/GoalDAL";
import {GoalMetricDAL} from "src/dataAccessLogic/GoalMetricDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {MentorRequestsSection} from "src/logic/wayPage/MentorRequestsSection";
import {MentorsSection} from "src/logic/wayPage/MentorsSection";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {renderModalContent} from "src/logic/wayPage/reportsTable/WayColumns";
import {WayStatistic} from "src/logic/wayPage/WayStatistic";
import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {Symbols} from "src/utils/Symbols";
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
  const [way, setWay] = useState<Way>();

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
  }, []);

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
              const updatedSingleGoalMetric = new SingleGoalMetric({...singleGoalMetric, isDone, doneDate: new Date()});
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
            <Tooltip content="Delete goal metric">
              <TrashIcon
                className={styles.icon}
                onClick={() => renderModalContent({
                  description: `Are you sure that you want to delete singleGoalMetric "${singleGoalMetric.description}"?`,

                  /**
                   * CallBack triggered on press ok
                   */
                  onOk: () => removeSingularGoalMetric(singleGoalMetric.metricUuid),
                })}
              />
            </Tooltip>
          )
          }
        </div>
      </Tooltip>
    );
  };

  /**
   * Render button Add goal metrics
   */
  const renderButtonAddMetrics = () => {
    return (
      <>
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
          />
        )
        }
      </>
    );
  };

  /**
   * Render goal metrics
   */
  const renderGoalMetric = (goalMetric: GoalMetric) => {
    return (
      <div>
        {goalMetric.metricUuids.map((metricUuid, index) => renderSingleGoalMetric(
          {
            uuid: goalMetric.uuid,
            metricUuid,
            description: goalMetric.description[index],
            doneDate: goalMetric.doneDate[index],
            isDone: goalMetric.isDone[index],
          },
        ))
        }
        {renderButtonAddMetrics()}
      </div>
    );
  };

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
        <HorizontalContainer className={styles. buttons}>
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
          <Title
            level={HeadingLevel.h3}
            text="Metrics"
          />
          <Accordion
            items={[
              {
                trigger: {child: "Metrics"},
                content: {child: renderGoalMetric(way.goal.metrics[0])},
              },
            ]}
            type={accordionTypes.multiple}
            className={styles.accordion}
          />
        </div>
        <div className={styles.goalSubSection}>
          <Title
            level={HeadingLevel.h3}
            text="Statistics"
          />
          <WayStatistic
            dayReports={way.dayReports}
            wayCreated={way.createdAt}
          />
        </div>
      </div>

      <ScrollableBlock>
        <DayReportsTable way={way} />
      </ScrollableBlock>
    </div>
  );
};

