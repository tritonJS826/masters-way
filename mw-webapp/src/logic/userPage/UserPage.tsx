import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * Change user's name
 */
const changeUserName = (user: UserPreview, text: string, callback: (user: UserPreview) => void) => {
  const updatedUser = new UserPreview({...user, name: text});
  callback(updatedUser);
  UserPreviewDAL.updateUserPreview(updatedUser);
};

/**
 * Change user's email
 */
const changeUserEmail = (user: UserPreview, text: string, callback: (user: UserPreview) => void) => {
  const updatedUser = new UserPreview({...user, email: text});
  callback(updatedUser);
  UserPreviewDAL.updateUserPreview(updatedUser);
};

/**
 * Change user's description
 */
const changeUserDescription = (user: UserPreview, text: string, callback: (user: UserPreview) => void) => {
  const updatedUser = new UserPreview({...user, description: text});
  callback(updatedUser);
  UserPreviewDAL.updateUserPreview(updatedUser);
};

/**
 * PageProps
 */
interface UserPageProps {

  /**
   * User's uuid
   */
  uuid: string;
}

/**
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const [userPreview, setUserPreview] = useState<UserPreview>();
  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);
  const [favoriteWays, setFavoriteWays] = useState<WayPreview[]>([]);
  const navigate = useNavigate();
  const {user} = useGlobalContext();
  const isPageOwner = !!user && !!userPreview && user.uuid === userPreview.uuid;

  /**
   * Load user
   */
  const getUser = async () => {
    const userPreviewData = await UserPreviewDAL.getUserPreview(props.uuid);
    // Navigate to PageError if transmitted user's uuid is not exist
    if (!userPreviewData.uuid) {
      navigate(pages.page404.getPath({}));
    }
    if (userPreviewData) {
      const ownWaysPreviewPromise = WayPreviewDAL.getWaysPreviewByUuids(userPreviewData.ownWays);
      const mentoringWaysPreviewPromise = WayPreviewDAL.getWaysPreviewByUuids(userPreviewData.mentoringWays);
      const favoriteWaysPreviewPromise = WayPreviewDAL.getWaysPreviewByUuids(userPreviewData.favoriteWays);

      const [
        ownWaysPreview,
        mentoringWaysPreview,
        favoriteWaysPreview,
      ] = await Promise.all([
        ownWaysPreviewPromise,
        mentoringWaysPreviewPromise,
        favoriteWaysPreviewPromise,
      ]);

      setOwnWays(ownWaysPreview);
      setMentoringWays(mentoringWaysPreview);
      setFavoriteWays(favoriteWaysPreview);
    }
    setUserPreview(userPreviewData);
  };

  useEffect(() => {
    getUser();
  }, [props.uuid]);

  if (!userPreview) {
    return (
      <span>
        loading..
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={userPreview.name}
        onChangeFinish={(text) => changeUserName(userPreview, text, setUserPreview)}
        isEditable={isPageOwner}
        className={styles.titleH2}
      />
      <Title
        level={HeadingLevel.h3}
        text={userPreview.email}
        onChangeFinish={(text) => changeUserEmail(userPreview, text, setUserPreview)}
        isEditable={isPageOwner}
        className={styles.titleH3}
      />
      <EditableTextarea
        text={userPreview.description}
        onChangeFinish={(text) => changeUserDescription(userPreview, text, setUserPreview)}
        isEditable={isPageOwner}
        className={styles.editableTextarea}
      />
      <ScrollableBlock>
        <OwnWaysTable
          uuid={props.uuid}
          ownWays={ownWays}
        />
      </ScrollableBlock>
      <ScrollableBlock>
        <MentoringWaysTable
          uuid={props.uuid}
          mentoringWays={mentoringWays}
          isPageOwner={isPageOwner}
          handleUserPreviewChange={setUserPreview}
        />
      </ScrollableBlock>
      <ScrollableBlock>
        <FavoriteWaysTable
          uuid={props.uuid}
          favoriteWays={favoriteWays}
        />
      </ScrollableBlock>
    </div>
  );
};
