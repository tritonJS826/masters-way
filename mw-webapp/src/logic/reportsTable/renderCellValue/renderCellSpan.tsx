import {SPACE} from "src/utils/unicodeSymbols";
import styles from "src/logic/reportsTable/columns.module.scss";

/**
 * Render Cell span with text
 */
const renderCellSpanWithValue = (value: string, isDone?: boolean, time?: boolean) => (
  <span className={isDone ? styles.completed : styles.notCompleted}>
    {time ? `${value} minutes` : value}
  </span>
);

/**
 * Render empty span
 */
const renderCellEmptySpan = () => (
  <span className={styles.emptyInput}>
    {SPACE}
  </span>
);

/**
 * Render cell's span
 */
export const renderCellSpan = (value: string, isDone?: boolean, time?: boolean) => (
  (value !== SPACE) ?
    renderCellSpanWithValue(value, isDone, time)
    :
    renderCellEmptySpan()
);