import {Button} from "src/component/button/Button";
import {Table} from "src/component/table/Table";
import {createNewDayReport} from "src/dataAccessLogic/createNewDayReport";
import styles from "src/pages/mainPage/MainPage.module.scss";

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
      <Button
        value="Create new day report"
        onClick={createNewDayReport}
      />
      <Table />
    </div>
  );
};