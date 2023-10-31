import {flexRender, HeaderGroup, RowModel} from "@tanstack/react-table";
import styles from "src/component/table/Table.module.scss";

/**
 * Uuid props
 */
interface UuidProps {

  /**
   * Uuid of row in the table
   */
  uuid: string;
}

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
  data: T;
}

/**
 * Table
 */
export const Table = <T extends UuidProps, > (props: TableProps<TableData<T>>) => {
  const data = props.data;

  return (
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
            id={row.original.uuid}
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
  );
};