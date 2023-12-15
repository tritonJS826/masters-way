import {renderMarkdown} from "src/utils/textUtils/renderMarkdown";
import styles from "src/component/editableText/renderSpan.module.scss";

export const DEFAULT_PLACEHOLDER = "*Empty markdown! Double click on me!*";

/**
 * Render span with text
 */
const renderSpanWithValue = (value: string | number, isDone?: boolean) => (
  <span className={isDone ? styles.completed : styles.notCompleted}>
    {renderMarkdown(value.toString())}
  </span>
);

/**
 * Render empty span
 */
const renderEmptySpan = (placeholderSpanText?: string) => (
  <span className={styles.emptySpan}>
    {placeholderSpanText ?? renderMarkdown(DEFAULT_PLACEHOLDER)}
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
