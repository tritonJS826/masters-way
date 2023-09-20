import styles from "src/pages/Page404/Page404.module.scss";

const ERROR_404 = "404 NOT FOUND";

export const Page404 = () => {
  return (
    <div className={styles.container}>
      {ERROR_404}
    </div>
  );
};