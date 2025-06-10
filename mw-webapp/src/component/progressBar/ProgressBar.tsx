import {Indicator, Root} from "@radix-ui/react-progress";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/progressBar/ProgressBar.module.scss";

const MAX_PERCENTAGE = 100;

/**
 * Function to get default right label for progress
 */
export const getDefaultRightValueLabel = (value: number, max: number) => `${value} / ${max}`;

/**
 * Function to get default left label for progress
 */
export const getDefaultLeftValueLabel = (value: number, max: number) => {
  const valueRaw = Math.round(value / max * MAX_PERCENTAGE);
  const isInteger = Number.isInteger(valueRaw);

  const formattedValue = isInteger ? `${valueRaw}%` : "0%";

  return formattedValue;
};

/**
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Progress bar itself with no labels
   */
  root: string;

  /**
   * Left label
   */
  leftLabel: string;

  /**
   * Right label
   */
  rightLabel: string;
}

/**
 * Type props
 */
interface ProgressBarProps {

  /**
   * Callback to show label on the progressbar
   * @default function {@link getDefaultRightValueLabel}
   */
  getRightValueLabel?: (value: number, max: number) => string;

  /**
   * Callback to show label on the progressbar
   * @default function {@link getDefaultRightValueLabel}
   */
  getLeftValueLabel?: (value: number, max: number) => string;

  /**
   * Fill value
   * With no max value it will be percentage
   * (minimum 0 maximum 100)
   */
  value: number;

  /**
   * Text to label
   */
  textToLabel: string;

  /**
   * Max available value
   * 100 by default
   */
  max?: number;

  /**
   * Data attribute for cypress testing
   */
  cy?: Cy;

}

/**
 * ProgressBar component
 */
export const ProgressBar = (props: ProgressBarProps) => {
  const max = props.max ?? MAX_PERCENTAGE;
  const percentage = Math.round((props.value / max) * MAX_PERCENTAGE);
  const getLeftValueLabel = props.getLeftValueLabel ?? getDefaultLeftValueLabel;
  const getRightValueLabel = props.getRightValueLabel ?? getDefaultRightValueLabel;

  return (
    <VerticalContainer className={styles.progressContainer}>
      <HorizontalContainer className={styles.description}>
        <span data-cy={props.cy?.leftLabel}>
          {getLeftValueLabel(props.value, max)}
        </span>
        <span data-cy={props.cy?.rightLabel}>
          {`${getRightValueLabel(props.value, max)} ${props.textToLabel}`}
        </span>
      </HorizontalContainer>
      <Root
        data-cy={props.cy?.root}
        className={styles.progressRoot}
        value={props.value}
        max={max}
      >
        <Indicator
          className={styles.progressIndicator}
          style={{transform: `translateX(-${MAX_PERCENTAGE - percentage}%)`}}
        />
      </Root>
    </VerticalContainer>
  );
};
