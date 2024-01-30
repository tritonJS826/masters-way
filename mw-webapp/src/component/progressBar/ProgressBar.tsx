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
  return (
    <div
      style={{background: `linear-gradient(45deg,var(--primaryBorderColor) ${props.percentage}%,  var(--hoverColor) 0% )`}}
      className={styles.progressBarContainer}
    >
      <div className={styles.progressIndicatorPercent}>
        {props.text}
      </div>
    </div>
  );
};

