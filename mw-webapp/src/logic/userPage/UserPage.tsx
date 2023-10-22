import {Navigate, useParams} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {pages} from "src/router/pages";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * User page
 */
export const UserPage = () => {
  const {uuid} = useParams() as QueryParamTypes;

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="User page"
      />
      <Button
        value="Create new way"
        onClick={() => WayPreviewDAL.createWayPreview(uuid)}
      />
      <Title
        text="Own ways"
        level={HeadingLevel.h3}
      />
      {uuid ? <OwnWaysTable uuid={uuid} /> : <Navigate to={pages.page404.path} />}
    </div>
  );
};
