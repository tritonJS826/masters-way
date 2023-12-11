import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Change description of Way
 */
const updateGoalWay = (wayPreview: WayPreview, description: string) => {
  const newGoal = new GoalPreview({...wayPreview.goal, description});
  GoalPreviewDAL.updateGoalPreview(newGoal);
};

/**
 * Create user with updated favorites
 */
const createUserPreviewWithUpdatedFavorites = (user: UserPreview, updatedFavoriteWays: string[]) => {
  return new UserPreview({
    uuid: user.uuid,
    favoriteWays: updatedFavoriteWays,
    name: user.name,
    email: user.email,
    description: user.description,
    ownWays: user.ownWays,
    mentoringWays: user.mentoringWays,
    createdAt: user.createdAt,
  });
};

/**
 * Create way with updated favorites
 */
const createWayWithUpdatedFavorites = (way: WayPreview, updatedFavoriteForUserUuids: string[]) => {
  return new WayPreview({
    uuid: way.uuid,
    name: way.name,
    dayReportUuids: way.dayReportUuids,
    owner: way.owner,
    goal: way.goal,
    mentors: way.mentors,
    mentorRequests: way.mentorRequests,
    isCompleted: way.isCompleted,
    lastUpdate: way.lastUpdate,
    favoriteForUserUuids: updatedFavoriteForUserUuids,
    createdAt: way.createdAt,
    wayTags: way.wayTags,
    jobTags: way.jobTags,
  });
};

/**
 * Delete favoriteWayUuid from favoriteWay array
 */
const deleteFavoriteWayUuid = async (
  userPreview: UserPreview,
  wayUuid: string,
  setUser: React.Dispatch<React.SetStateAction<UserPreview | null>>,
) => {
  const updatedFavoriteWays = userPreview.favoriteWays.filter((favoriteWay) => favoriteWay !== wayUuid);
  const updatedUserPreview = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);

  setUser(updatedUserPreview);

  await UserPreviewDAL.updateUserPreview(updatedUserPreview);
};

/**
 * Add favoriteWayUuid to favoriteWay array
 */
const addFavoriteWayUuid = async (
  userPreview: UserPreview,
  wayUuid: string,
  setUser: React.Dispatch<React.SetStateAction<UserPreview | null>>,
) => {
  const updatedFavoriteWays = [...userPreview.favoriteWays, wayUuid];
  const updatedUserPreview = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);

  setUser(updatedUserPreview);

  await UserPreviewDAL.updateUserPreview(updatedUserPreview);
};

/**
 * Add new favoriteUserUuid to favoriteForUserUuids array
 */
const addFavoriteForUserUuids = async (
  way: WayPreview,
  userUuid: string,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | undefined>>,
) => {
  const updatedFavoriteForUserUuids = [...way.favoriteForUserUuids, userUuid];
  const updatedWay = createWayWithUpdatedFavorites(way, updatedFavoriteForUserUuids);

  await WayPreviewDAL.updateWayPreview(updatedWay);
  setWay(updatedWay);
};

/**
 * Delete new favoriteUserUuid to favoriteForUserUuids array
 */
const removeFavoriteForUserUuids = async (
  way: WayPreview,
  userUuid: string,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | undefined>>,
) => {
  const updatedFavoriteForUserUuids = way.favoriteForUserUuids.filter((favorite) => favorite !== userUuid);
  const updatedWay = createWayWithUpdatedFavorites(way, updatedFavoriteForUserUuids);

  await WayPreviewDAL.updateWayPreview(updatedWay);
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
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const {user, setUser} = useGlobalContext();
  const [way, setWay] = useState<WayPreview>();
  const isOwner = user?.uuid === way?.owner.uuid;
  const isWayInFavorites = user && way && user.favoriteWays.includes(way.uuid);
  const likes = way?.favoriteForUserUuids.length;

  const ONE_LIKE = 1;

  /**
   * Get Way
   */
  const loadWay = async () => {
    const data = await WayPreviewDAL.getWayPreview(props.uuid);
    // Navigate to PageError if transmitted way's uuid is not exist
    if (!data) {
      navigate(pages.page404.getPath({}));
    }
    setWay(data);
  };

  useEffect(() => {
    loadWay();
  }, [user]);

  /**
   * Change name of Way
   */
  const changeWayName = (wayPreview: WayPreview, text: string) => {
    const updatedWay = new WayPreview({...wayPreview, name: text});
    WayPreviewDAL.updateWayPreview(updatedWay);
  };

  /**
   * Render all way's mentors
   */
  const renderMentors = (wayPreview: WayPreview) => {
    return wayPreview.mentors.map((item) => (
      <Link
        key={item.uuid}
        value={item.name}
        path={pages.user.getPath({uuid: item.uuid})}
        className={styles.mentors}
      />
    ));
  };

  return (
    <>
      {way &&
        <div className={styles.container}>
          <Title
            level={HeadingLevel.h2}
            text={`${way.name}`}
            onChangeFinish={(text) => changeWayName(way, text)}
            isEditable={isOwner}
          />
          <div>
            {likes === 0 && "No likes"}
            {likes === ONE_LIKE && `${likes} like`}
            {!!likes && likes > ONE_LIKE && `${likes} likes`}
          </div>
          <Title
            level={HeadingLevel.h3}
            text="Goal"
            onChangeFinish={(text) => changeWayName(way, text)}
          />
          <EditableTextarea
            text={way.goal.description}
            onChangeFinish={(description) => updateGoalWay(way, description)}
            rows={5}
            isEditable={isOwner}
          />
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
                deleteFavoriteWayUuid(user, way.uuid, setUser);
                removeFavoriteForUserUuids(way, user.uuid, setWay);
              }}
            />
          }
          {
            !isWayInFavorites && user && setUser &&
            <Button
              value={"Add to favorite"}
              onClick={() => {
                addFavoriteWayUuid(user, way.uuid, setUser);
                addFavoriteForUserUuids(way, user.uuid, setWay);
              }}
            />
          }
          {!!renderMentors(way).length && (
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
      }
    </>
  );
};
