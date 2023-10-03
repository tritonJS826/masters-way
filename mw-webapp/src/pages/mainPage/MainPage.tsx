import {Table} from "src/component/table/Table";
import styles from "src/pages/mainPage/MainPage.module.scss";

/**
 * Main page with common title and {@link Table} of dayReports
 * @returns title and {@link Table}
 */

/**
 * TODO: wait for table refactor into component get user, create table component for each way
 * TODO: if user doesnt have ways just display every way
 */

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
      <Table />
    </div>
  );
};