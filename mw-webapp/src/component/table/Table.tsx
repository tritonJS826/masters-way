import {useContext} from "react";
import {
  flexRender,
  HeaderGroup,
  RowModel,
} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import styles from "src/component/table/Table.module.scss";

/**
 * Context's props table users
 */
export interface TableUsers {
  /**
 * Group headers table
 */
  headerGroup: HeaderGroup<DayReport>[];
  /**
 * Object rows table
 */
  rowModel: RowModel<DayReport>;
}

/**
 * Table's contexts
 */
type ContextTable = React.Context<TableUsers | null>

/**
 * Table's props
 */
interface TableProps {
  /**
  * Table's context
  */
  context: ContextTable;
}

/**
 * Table
 */
export const Table:React.FC<TableProps> = (props: TableProps) => {
  const dataContentTable = useContext(props.context);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {dataContentTable?.headerGroup.map((headerGroup) => (
            <tr
              className={styles.tr}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th
                  className={styles.th}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {dataContentTable?.rowModel.rows.map((row) => (
            <tr
              className={styles.tr}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className={styles.td}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
