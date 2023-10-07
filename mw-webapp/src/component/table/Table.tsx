import {flexRender, HeaderGroup, RowModel} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import styles from "src/component/table/Table.module.scss";

/**
 * Tables data
 */
interface TableData<T> {

  /**
   * Table headers
   */
  headerGroup: HeaderGroup<T>[];

  /**
   * Table rows
   */
  rowModel: RowModel<T>;
}

/**
 * Table's props
 */
interface TableProps<T> {

  /**
   * Table's data
   */
  data: TableData<T>;
}

/**
 * Table's model
 */
type TablesModel = DayReport

/**
 * Table
 */
export const Table = <T extends TablesModel >(props: TableProps<T>) => {
  const data = props.data;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {data.headerGroup.map((headerGroup) => (
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
                      header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {data.rowModel.rows.map((row) => (
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
              ))
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
