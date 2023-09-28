import {useContext} from "react";
import {
  flexRender,
  HeaderGroup,
  RowModel,
} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import styles from "src/component/table/Table.module.scss";

export interface TableUsers {
  headerGroup: HeaderGroup<DayReport>[];
  rowModel: RowModel<DayReport>;
}

type ContextTable = React.Context<TableUsers | null>

interface TableProps {
  context: ContextTable;
}

const useGetTableContext = (props: TableProps) => useContext(props.context);

/**
 * Table (need update for split component and logic code)
 */
export const Table = (props: TableProps) => {
  const data = useGetTableContext(props);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {data?.headerGroup.map((headerGroup) => (
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
          {data?.rowModel.rows.map((row) => (
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
