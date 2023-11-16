import {useEffect, useState} from "react";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
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
  const [userName, setUserName] = useState<string>("");

  /**
   * Load user
   */
  const getUser = async () => {
    const user = await UserPreviewDAL.getUserPreview(props.uuid);
    setUserName(user.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={`Page of ${userName}`}
      />
      <>
        <Title
          text="Own ways"
          level={HeadingLevel.h3}
        />
        <OwnWaysTable uuid={props.uuid} />
        <Title
          text="Mentoring ways"
          level={HeadingLevel.h3}
        />
        <MentoringWaysTable uuid={props.uuid} />
        <Title
          text="Favorite ways"
          level={HeadingLevel.h3}
        />
        <FavoriteWaysTable uuid={props.uuid} />
      </>
    </div>
  );
};
