import {PropsWithChildren} from "react";
import styles from "src/component/table/tableCell/cellItem/CellItem.module.scss";

/**
 * CellItem props
 */
interface CellItemProps {

  /**
   * Unique key of cell item
   */
  key: string;
}

/**
 * CellItem
 */
export const CellItem = (props: PropsWithChildren<CellItemProps>) => {
  return (
    <div
      className={styles.cellItem}
      key={props.key}
    >
      {props.children}
    </div>
  );
};