import {useState, useEffect} from "react";
import {useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table";
import {Report} from "src/model/report/Report";
import {ReportService} from "src/service/Report";
import {columns} from "src/component/table/columns";
import styles from "src/component/table/Table.module.scss";

export const Table = () => {
  const [data, setData] = useState<Report[]>([]);

  const getReports = async () => {
    const reports = await ReportService.getAllReports();
    setData(reports.reverse());
    return reports;
  };

  useEffect(() => {
    getReports();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
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
          {table.getRowModel().rows.map((row) => (
            <tr className={styles.tr}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className={styles.td}
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