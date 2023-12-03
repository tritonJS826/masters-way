import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {useUserContext} from "src/component/header/UserContext";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
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
 * Delete favoriteWayUuid from favoriteWay array
 */
const deleteFavoriteWayUuid = (favoriteWays: string[], wayUuid: string) => {
  return favoriteWays.filter((favoriteWay) => favoriteWay !== wayUuid);
};

/**
 * Add favoriteWayUuid to favoriteWay array
 */
const addFavoriteWayUuid = (favoriteWays: string[], wayUuid: string) => {
  return [...favoriteWays, wayUuid];
};

/**
 * Check if favoriteWayUuid is already in favoriteWay array
 */
const isWayInFavorites = (wayUuid: string, favoriteWays: string[]) => {
  return favoriteWays.includes(wayUuid);
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
  const {user} = useUserContext();
  const [way, setWay] = useState<WayPreview>();
  const [currentUser, setCurrentUser] = useState<UserPreview | null>(null);

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

  /**
   * Load current user
   */
  const loadCurrentUser = async () => {
    if (user) {
      const currentUserPreview = await UserPreviewDAL.getUserPreview(user.uid);
      setCurrentUser(currentUserPreview);
    }
  };

  useEffect(() => {
    loadWay();
    loadCurrentUser();
  }, [way]);

  /**
   * Change name of Way
   */
  const changeWayName = (wayPreview: WayPreview, text: string) => {
    const updatedWay = new WayPreview({...wayPreview, name: text});
    WayPreviewDAL.updateWayPreview(updatedWay);
  };

  /**
   * Update favorite ways
   */
  const updateFavoriteWays = async (wayUuid: string, favoriteWays: string[]) => {
    const updatedFavoriteWays =
      isWayInFavorites(wayUuid, favoriteWays)
        ? deleteFavoriteWayUuid(favoriteWays, wayUuid)
        : addFavoriteWayUuid(favoriteWays, wayUuid);

    const updatedUserPreview = {...currentUser, favoriteWays: updatedFavoriteWays};

    await UserPreviewDAL.updateUserPreview(updatedUserPreview as UserPreview);
  };

  /**
   * Render all way's mentors
   */
  const renderMentors = (wayPreview: WayPreview) => {
    return wayPreview.currentMentors.map((item) => (
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
            isEditable={true}
          />
          <Title
            level={HeadingLevel.h3}
            text="Goal"
            onChangeFinish={(text) => changeWayName(way, text)}
          />
          <EditableTextarea
            text={way.goal.description}
            onChangeFinish={(description) => updateGoalWay(way, description)}
            rows={5}
          />
          {currentUser && <Button
            value={isWayInFavorites(way.uuid, currentUser.favoriteWays) ? "Remove from favorite" : "Add to favorite"}
            onClick={() => updateFavoriteWays(way.uuid, currentUser.favoriteWays)}
          />}
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
