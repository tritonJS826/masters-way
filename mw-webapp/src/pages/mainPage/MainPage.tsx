import {Table} from "src/component/table/Table";
import styles from "src/pages/mainPage/MainPage.module.scss";

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