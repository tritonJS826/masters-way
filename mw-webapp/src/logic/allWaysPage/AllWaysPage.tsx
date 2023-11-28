import {HeadingLevel, Title} from "src/component/title/Title";
import {AllWaysTable} from "src/logic/waysTable/AllWaysTable";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

/**
 * Ways page
 */
export const AllWaysPage = () => {
  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Ways page"
      />
      <div className={styles.scrollable}>
        <AllWaysTable />
      </div>
    </>
  );
};
