import styles from "src/logic/reportsTable/columns.module.scss";

/**
 * Zero-width space by unicode
 */
const SPACE = "\u200B";

/**
 * Render Cell span with text
 */
const renderCellSpanWithValue = (value: string, isDone?: boolean) => (
  <span className={isDone ? styles.completed : styles.notCompleted}>
    {value}
  </span>
);

/**
 * Render empty span
 */
const renderCellEmptySpan = () => (
  <span className={styles.notCompleted}>
    {SPACE}
  </span>
);

/**
 * Render cell's span
 */
export const renderCellSpan = (value: string, isDone?: boolean) => (
  (value) ?
    renderCellSpanWithValue(value, isDone)
    :
    renderCellEmptySpan()
);