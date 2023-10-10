import {ReportsTable} from "src/pages/reportsTable/ReportsTable";
import styles from "src/pages/mainPage/MainPage.module.scss";

/*
* TODO: wait for table refactor into component get user, create table component for each way
* TODO: if user doesnt have ways just display every way
*/

/**
 * Main page with common title and {@link Table} of dayReports
 * @returns title and {@link Table}
 */
export const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
      <ReportsTable />
    </div>
  );
};
