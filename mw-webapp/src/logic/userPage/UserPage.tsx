
import {useParams} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
import {OwnedWaysTable} from "src/logic/waysTable/OwnedWaysTable";
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
      <Title
        text="Owned ways"
        level={HeadingLevel.h3}
        className={""}
      />
      {uuid ? <OwnedWaysTable uuid={uuid} /> : null}
    </div>
  );
};
