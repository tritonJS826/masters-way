
import {Navigate, useParams} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
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
          </>
        )
        : <Navigate to={pages.page404.path} />}
    </div>
  );
};
