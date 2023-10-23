import {Navigate, useParams} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {pages} from "src/router/pages";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * User page
 */
export const UserPage = () => {
  const {uuid} = useParams<QueryParamTypes["uuid"]>();

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="User page"
      />
      {uuid
        ? (
          <>
            <Button
              value="Create new way"
              onClick={() => WayPreviewDAL.createWayPreview(uuid)}
            />
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

      /**
       * TODO: Refactor ternary operator after history\redirecting logic is done
       * (user is asked to log in and after that he is returned to the page)
       */
        : <Navigate to={pages.page404.path} />}
    </div>
  );
};
