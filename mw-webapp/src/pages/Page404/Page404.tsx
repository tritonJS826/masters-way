import styles from "src/pages/page404/Page404.module.scss";

const ERROR_404 = "404 NOT FOUND";

export const Page404 = () => {
  return (
    <h1 className={styles.errorPageContainer}>
      {ERROR_404}
    </h1>
  );
};