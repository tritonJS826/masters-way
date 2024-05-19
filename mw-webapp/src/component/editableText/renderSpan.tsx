import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/editableText/renderSpan.module.scss";

/**
 * Render span with text
 */
const renderSpanWithValue = (value: string | number) => (
  <div>
    {renderMarkdown(value.toString())}
  </div>
);

/**
 * Render empty span
 */
const renderEmptySpan = (placeholderSpanText: string) => (
  <span className={styles.emptySpan}>
    {renderMarkdown(placeholderSpanText)}
  </span>
);

/**
 * Params for {@link renderSpan}
 */
interface RenderSpanParams {

  /**
   * Displayed values
   */
  value: string | number;

  /**
   * Placeholder
   */
  placeholder: string;
}

/**
 * Render cell's span
 * TODO: move to separate component, task #208
 */
export const renderSpan = (params: RenderSpanParams) => (
  (params.value.toString().trim() === "")
    ? renderEmptySpan(params.placeholder)
    : renderSpanWithValue(params.value)
);
