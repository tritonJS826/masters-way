import styles from "src/component/progressBar/ProgressBar.module.scss";

/**
 * Type props
 */
interface ProgressBarProps {

  /**
   * Text to show in progress bar
   * No text by default
   */
  text?: string;

  /**
   * Fill percentage
   * (minimum 0 maximum 100)
   */
  percentage: number;
}

/**
 * ProgressBar component
 */
export const ProgressBar = (props: ProgressBarProps) => {
  if (!isNaN(props.percentage)) {
    return (
      <div className={styles.progressBarContainer}>
        <div
          style={{width: `${props.percentage}%`}}
          className={styles.progressIndicator}
        >
          <div className={styles.progressIndicatorPercent}>
            {props.text}
          </div>
        </div>

      </div>
    );
  }
};

