
import {Navigate, useParams} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
import {FavouriteWaysTable} from "src/logic/waysTable/FavouriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {pages} from "src/router/pages";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * User page
 */
export const UserPage = () => {
  const {uuid} = useParams();

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="User page"
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
              text="Favourite ways"
              level={HeadingLevel.h3}
            />
            <FavouriteWaysTable uuid={uuid} />
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
