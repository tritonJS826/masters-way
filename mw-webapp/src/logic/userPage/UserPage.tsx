import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * PageProps
 */
interface UserPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const [userPreview, setUserPreview] = useState<UserPreview | null>(null);
  const navigate = useNavigate();

  /**
   * Load user
   */
  const getUser = async () => {
    const user = await UserPreviewDAL.getUserPreview(props.uuid);
    // Navigate to PageError if transmitted user's uuid is not exist
    if (!user.uuid) {
      navigate(pages.page404.getPath({}));
    }
    setUserPreview(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    userPreview &&
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={`Page of ${userPreview.name}`}
      />
      <>
        <Title
          text= {`Own Ways (totally ${userPreview.ownWays.length} ways)`}
          level={HeadingLevel.h3}
        />
        <OwnWaysTable uuid={props.uuid} />
        <Title
          text={`Own Ways (totally ${userPreview.mentoringWays.length} ways)`}
          level={HeadingLevel.h3}
        />
        <MentoringWaysTable uuid={props.uuid} />
        <Title
          text={`Own Ways (totally ${userPreview.favoriteWays.length} ways)`}
          level={HeadingLevel.h3}
        />
        <FavoriteWaysTable uuid={props.uuid} />
      </>
    </div>
  );
};
