import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {pages} from "src/router/pages";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * User page
 */
export const UserPage = () => {
  const {uuid} = useParams<QueryParamTypes>();
  const [userName, setUserName] = useState<string>("");

  if (!uuid) {
    throw new Error("User is not exist");
  }

  /**
   * Set user name
   */
  const getUser = async () => {
    const user = await UserPreviewDAL.getUserPreview(uuid);
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
      {uuid
        ? (
          <>
            <Title
              text="Own ways"
              level={HeadingLevel.h3}
            />
            <OwnWaysTable uuid={uuid} />
            <Title
              text="Mentoring ways"
              level={HeadingLevel.h3}
            />
            <MentoringWaysTable uuid={uuid} />
            <Title
              text="Favorite ways"
              level={HeadingLevel.h3}
            />
            <FavoriteWaysTable uuid={uuid} />
          </>
        )

      /**
       * TODO: Refactor ternary operator after history\redirecting logic is done
       * (user is asked to log in and after that he is returned to the page)
       */
        : <Navigate to={pages.page404.path} />}
    </div>
  );
};
