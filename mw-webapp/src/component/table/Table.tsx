import {useEffect, useState} from "react";
import Loading from "../inProgress/InProgress";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {columns} from "src/component/table/columns";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportService} from "src/service/DayReportService";
import styles from "src/component/table/Table.module.scss";

export const Table = () => {
  const [data, setData] = useState<DayReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DayReportService.onValueFromRealTimeDb(setData);
    setTimeout(() => {
      setLoading(false);
    // eslint-disable-next-line no-magic-numbers
    }, 2000);
    () => {
      //TODO
      // RemoveEventListener from db if needed (read about handling event listeners
      // In react use effect components (when and whyu you shoud remove them))
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.tr}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <th className={styles.th}
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
          {loading ? <Loading /> : table.getRowModel().rows.map((row) => (
            <tr className={styles.tr}
              key={row.id}
            >
              {
                row.getVisibleCells().map((cell) => (
                  <td className={styles.td}
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
