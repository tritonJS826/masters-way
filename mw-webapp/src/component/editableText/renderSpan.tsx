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
const renderEmptySpan = (placeholderSpanText: string | undefined) => (
  <span className={styles.emptySpan}>
    {placeholderSpanText ?? "Empty line..."}
  </span>
);

/**
 * Render cell's span
 * TODO: move to separate component, task #208
 */
export const renderSpan = (value: string | number, isDone?: boolean, placeholderSpanText?: string) => (
  (value === "")
    ? renderEmptySpan(placeholderSpanText)
    : renderSpanWithValue(value, isDone)
);