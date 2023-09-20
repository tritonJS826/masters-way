import styles from "src/pages/Page404/Page404.module.scss";

const TEXT_ERROR = "404 NOT FOUND";

export const Page404 = () => {
  return (
    <div className={styles.container}>
      {TEXT_ERROR}
    </div>
  );
};