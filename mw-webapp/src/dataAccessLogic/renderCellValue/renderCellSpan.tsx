import styles from "src/component/table/columns.module.scss";

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
    &#8203;
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