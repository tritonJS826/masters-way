import {PropsWithChildren} from "react";
import {Button} from "src/component/button/Button";
import styles from "src/component/table/tableCell/TableCell.module.scss";

/**
 * TableCell props
 */
interface TableCellProps {

  /**
   * Text for button
   */
  buttonValue?: string;

  /**
   * Callback for button inside tableCell
   */
  onButtonClick?: () => void;
}

/**
 * Render cell for table
 */
export const TableCell = (props: PropsWithChildren<TableCellProps>) => {
  return (
    <ol className={styles.cell}>
      {props.children}
      {props.buttonValue &&
        <Button
          value={props.buttonValue}
          onClick={props.onButtonClick ?? (() => {})}
        />
      }
    </ol>
  );
};
