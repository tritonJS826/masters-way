import {flexRender, HeaderGroup, RowModel} from "@tanstack/react-table";
import clsx from "clsx";
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
 * Data attributes for cypress testing
 */
interface dataCy {

  /**
   * Data attribute for cypress testing
   */
  dataCyTable?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyTh?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyTBodyTd?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyTBodyTr?: string;
}

/**
 * Table's props
 */
interface TableProps<T> {

  /**
   * Table's data
   */
  data: T;

  /**
   * Custom class for td
   * @default is none
   */
  classNameTd?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: dataCy;
}

/**
 * Table
 */
export const Table = <T extends UuidProps, > (props: TableProps<TableData<T>>) => {
  const data = props.data;

  return (
    <table
      className={styles.table}
      data-cy={props.dataCy?.dataCyTable}
    >
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
                data-cy={props.dataCy?.dataCyTh}
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
            data-cy={props.dataCy?.dataCyTBodyTr}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                className={clsx(styles.td, props.classNameTd)}
                key={cell.id}
                data-cy={props.dataCy?.dataCyTBodyTd}
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
