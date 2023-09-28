import {createContext, PropsWithChildren, useContext, useMemo} from "react";
import {
  flexRender,
  getCoreRowModel,
  HeaderGroup,
  RowModel,
  useReactTable,
} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {DayReport} from "src/model/businessModel/DayReport";
import {useGetDataTable} from "src/service/TableService";
import styles from "src/component/table/Table.module.scss";

interface Table {
  header: HeaderGroup<DayReport>[];
  row: RowModel<DayReport>;
}

type ContextTable = React.Context<Table | null>

interface ITable {
  context: ContextTable;
}

export const TableContext = createContext<null | Table>(null);

export const useTableContext = (props: ITable) => useContext(props.context);

export const WrapperTable: React.FC<Required<PropsWithChildren>> = (props: Required<PropsWithChildren>) => {
  const data = useGetDataTable();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const header = table.getHeaderGroups();
  const row = table.getRowModel();

  const valueContent = useMemo(() => {
    return {header, row};
  }, [data]);
  return (
    <TableContext.Provider value={valueContent}>
      {props.children}
    </TableContext.Provider>
  );
};

/**
 * Table (need update for split component and logic code)
 */
export const Table = (props: ITable) => {
  const data = useTableContext(props);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {data?.header.map((headerGroup) => (
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
          {data?.row.rows.map((row) => (
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
