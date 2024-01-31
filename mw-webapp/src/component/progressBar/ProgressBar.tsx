import {Indicator, Root} from "@radix-ui/react-progress";
import styles from "src/component/progressBar/ProgressBar.module.scss";

const MAX_PERCENTAGE = 100;

/**
 * Function to get default label for progress
 */
export const getDefaultLongValueLabel = (value: number, max: number) => (
  `${value} out of ${max} (${value / max * MAX_PERCENTAGE}%)`
);

/**
 * Type props
 */
interface ProgressBarProps {

  /**
   * Callback to show label on the progressbar
   * @default function {@link getDefaultLongValueLabel}
   */
  getValueLabel?: (value: number, max: number) => string;

  /**
   * Fill value
   * With no max value it will be percentage
   * (minimum 0 maximum 100)
   */
  value: number;

  /**
   * Max available value
   * 100 by default
   */
  max?: number;

}

/**
 * ProgressBar component
 */
export const ProgressBar = (props: ProgressBarProps) => {
  const max = props.max ?? MAX_PERCENTAGE;
  const percentage = Math.round((props.value / max) * MAX_PERCENTAGE);
  const getValueLabel = props.getValueLabel ?? getDefaultLongValueLabel;

  return (
    <Root
      className={styles.progressContainer}
      value={props.value}
      getValueLabel={getValueLabel}
      max={max}
    >
      <Indicator
        className={styles.progressIndicator}
        style={{transform: `translateX(-${MAX_PERCENTAGE - percentage}%)`}}
      />
      <span>
        {getValueLabel(props.value, max)}
      </span>
    </Root>
  );
};

