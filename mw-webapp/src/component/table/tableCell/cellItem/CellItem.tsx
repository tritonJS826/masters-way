import {PropsWithChildren} from "react";
import styles from "src/component/table/tableCell/cellItem/CellItem.module.scss";

/**
 * CellItem props
 */
interface CellItemProps {

  /**
   * Unique key of cell item
   */
  key: string | number;
}

/**
 * CellItem
 */
export const CellItem = (props: PropsWithChildren<CellItemProps>) => {
  return (
    <li
      className={styles.cellItem}
      key={props.key}
    >
      {props.children}
    </li>
  );
};