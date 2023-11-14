import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/logic/reportsTable/columns.module.scss";

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
  <span className={styles.emptyInput}>
    {UnicodeSymbols.ZERO_WIDTH_SPACE}
  </span>
);

/**
 * Render cell's span
 * TODO: move to separate component, task #208
 */
export const renderSpan = (value: string | number, isDone?: boolean) => (
  (value === UnicodeSymbols.ZERO_WIDTH_SPACE)
    ? renderEmptySpan()
    : renderSpanWithValue(value, isDone)
);