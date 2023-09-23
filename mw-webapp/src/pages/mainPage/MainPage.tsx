import {LoadingProvider} from "src/component/table/LoadingContext";
import {Table} from "src/component/table/Table";
import {UsersBlock} from "src/component/usersBlock/UsersBlock";
import {WaysBlock} from "src/component/waysBlock/WaysBlock";
import styles from "src/pages/mainPage/MainPage.module.scss";

export const MainPage = () => {
  return (
    <LoadingProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Hiii, Student!
        </h1>
        <UsersBlock />
        <WaysBlock />
        <Table />
      </div>
    </LoadingProvider>
  );
};
