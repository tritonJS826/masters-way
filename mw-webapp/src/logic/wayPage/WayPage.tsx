import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
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
    ...user,
    favoriteWays: updatedFavoriteWays,
  });
};

/**
 * Create way with updated favorites
 */
const createWayWithUpdatedFavorites = (way: WayPreview, updatedFavoriteForUserUuids: string[]) => {
  return new WayPreview({
    ...way,
    favoriteForUserUuids: updatedFavoriteForUserUuids,
  });
};

/**
 * Add way uuid to UserPreview favoriteWays and add user uuid to WayPreview favoriteForUserUuids
 */
const addFavoriteToWayAndToUser = async (
  userPreview: UserPreview,
  wayPreview: WayPreview,
  setUser: (user: UserPreview) => void,
  setWay: (way: WayPreview) => void,
) => {
  const updatedFavoriteForUserUuids = wayPreview.favoriteForUserUuids.concat(userPreview.uuid);
  const updatedFavoriteWays = userPreview.favoriteWays.concat(wayPreview.uuid);

  await WayPreviewDAL.updateFavoritesForUserAndWay(
    userPreview.uuid,
    wayPreview.uuid,
    updatedFavoriteForUserUuids,
    updatedFavoriteWays,
  );

  const user = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);
  const way = createWayWithUpdatedFavorites(wayPreview, updatedFavoriteForUserUuids);
  setUser(user);
  setWay(way);
};

/**
 * Delete way uuid from UserPreview favoriteWays and delete user uuid from WayPreview favoriteForUserUuids
 */
const deleteFavoriteFromWayAndFromUser = async (
  userPreview: UserPreview,
  wayPreview: WayPreview,
  setUser: (user: UserPreview) => void,
  setWay: (way: WayPreview) => void,
) => {
  const updatedFavoriteForUserUuids = wayPreview.favoriteForUserUuids.filter((favorite) => favorite !== userPreview.uuid);
  const updatedFavoriteWays = userPreview.favoriteWays.filter((favoriteWay) => favoriteWay !== wayPreview.uuid);

  await WayPreviewDAL.updateFavoritesForUserAndWay(
    userPreview.uuid,
    wayPreview.uuid,
    updatedFavoriteForUserUuids,
    updatedFavoriteWays,
  );

  const user = createUserPreviewWithUpdatedFavorites(userPreview, updatedFavoriteWays);
  const way = createWayWithUpdatedFavorites(wayPreview, updatedFavoriteForUserUuids);
  setUser(user);
  setWay(way);
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
  const favoriteForUsersAmount = way?.favoriteForUserUuids.length ?? 0;

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
            Amount of users who add it to favorite:
            {UnicodeSymbols.SPACE + favoriteForUsersAmount}
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
