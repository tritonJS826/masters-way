import styles from "src/component/progressBar/ProgressBar.module.scss";
 type ProgressBarProps = {/**
                           * ProgressBar prop type
                           */
   progress: Array<boolean>;}

/**
 * ProgressBar component
 */
export const ProgressBar = (arg: ProgressBarProps) => {
  const PERCENT = 100;
  const countTrue = arg.progress.filter((item) => item).length;
  const computedProcent = (PERCENT / arg.progress.length) * countTrue;
  if (arg.progress.length > 0) {
    return (
      <>
        <div className={styles.progressBarContainer}>
          <div
            style={{width: `${computedProcent}%`}}
            className={styles.progressIndicator}
          >
            <div className={styles.progressIndicatorPercent}>
              {computedProcent.toFixed() + "%"}
            </div>
          </div>

        </div>

      </>

    );
  }
};

