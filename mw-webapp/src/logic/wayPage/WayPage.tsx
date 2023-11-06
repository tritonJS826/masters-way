import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportsTable} from "src/logic/reportsTable/DayReportsTable";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Way page
 */
export const WayPage = () => {
  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="Way page"
      />
      <DayReportsTable />
    </div>
  );
};
