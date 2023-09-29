import {memo} from "react";
import {
  flexRender,
  HeaderGroup,
  RowModel,
} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import styles from "src/component/table/Table.module.scss";

/**
 * Table's data props
 */
export interface TableReports {
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
 * Table's props
 */
interface TableProps {
  /**
  * Table's data
  */
  data: TableReports;
}

/**
 * Table
 */
export const Table:React.FC<TableProps> = memo((props: TableProps) => {
  const data = props.data;
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {data.headerGroup?.map((headerGroup) => (
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
          {data.rowModel?.rows.map((row) => (
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
});

Table.displayName = "Table";
