import styles from "src/component/table/columns.module.scss";

const renderCellSpanWithValue = (value: string) => (
  <span>
    {value}
  </span>
);

const renderCellEmptySpan = () => (
  <span className={styles.notCompleted}>
    &#8203;
  </span>
);

/**
 * Render cell's span
 * @param {string} value
 * @returns {JSX.Element} JSX.Element
 */
export const renderCellSpan = (value: string) => (
  (value !== "" && value !== " ") ?
    renderCellSpanWithValue(value)
    :
    renderCellEmptySpan()
);