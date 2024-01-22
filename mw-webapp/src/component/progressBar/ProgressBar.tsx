import styles from "src/component/progressBar/ProgressBar.module.scss";

const MAX_PERCENTAGE = 100;

/**
 * Type props
 */
interface ProgressBarProps {

  /**
   * Array of metrics
   */
  progress: boolean[];
}

/**
 * ProgressBar component
 */
export const ProgressBar = (props: ProgressBarProps) => {
  const countTrue = props.progress.filter((item) => item).length;
  const computedProcent = (MAX_PERCENTAGE / props.progress.length) * countTrue;
  if (props.progress.length > 0) {
    return (
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
    );
  }
};

