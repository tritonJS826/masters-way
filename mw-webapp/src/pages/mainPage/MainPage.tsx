
import styles from "src/pages/mainPage/MainPage.module.scss";

/**
 * Main page with common title
 */
export const MainPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
    </div>
  );
};
