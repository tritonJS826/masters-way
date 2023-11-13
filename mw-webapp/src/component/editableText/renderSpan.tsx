import {unicodeSymbols} from "src/utils/unicodeSymbols";
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
    {unicodeSymbols.space}
  </span>
);

/**
 * Render cell's span
 * TODO: move to separate component, task #208
 */
export const renderSpan = (value: string | number, isDone?: boolean) => (
  (value === unicodeSymbols.space) ?
    renderEmptySpan()
    :
    renderSpanWithValue(value, isDone)
);