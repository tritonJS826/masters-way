import {HeadingLevel, Title} from "src/component/title/Title";
import {AllUsersTable} from "src/logic/usersTable/AllUsersTable";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

/**
 * Users page
 */
export const AllUsersPage = () => {
  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Users page"
      />
      <div className={styles.scrollable}>
        <AllUsersTable />
      </div>
    </>
  );
};