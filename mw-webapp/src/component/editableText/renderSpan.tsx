import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/component/editableText/renderSpan.module.scss";

/**
 * Render span with text
 */
const renderSpanWithValue = (value: string | number, isDone?: boolean) => (
  <span className={isDone ? styles.completed : styles.notCompleted}>
    {value}
  </span>
);

/**
 * Render empty span
 */
const renderEmptySpan = () => (
  <span className={styles.emptySpan}>
    {UnicodeSymbols.ZERO_WIDTH_SPACE}
  </span>
);

/**
 * Render cell's span
 * TODO: move to separate component, task #208
 */
export const renderSpan = (value: string | number, isDone?: boolean) => (
  (value === UnicodeSymbols.ZERO_WIDTH_SPACE || !value)
    ? renderEmptySpan()
    : renderSpanWithValue(value, isDone)
);