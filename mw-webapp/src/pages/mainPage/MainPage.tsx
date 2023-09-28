import {Table, TableContext, WrapperTable} from "src/component/table/Table";
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
      <WrapperTable>
        <Table context={TableContext} />
      </WrapperTable>
    </div>
  );
};